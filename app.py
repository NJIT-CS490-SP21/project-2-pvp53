'''
@file app.py
This file is the entire backend of the tic-tac-toe created in this project and uses
flask, db, and socketio to fullfill the requirements for this project.
'''

import os, copy
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())  # This is to load your env variables from .env

app = Flask(__name__, static_folder='./build/static')
# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import models
db.create_all()

#GLOBAL VARIABLES
USER_NAME = {'0': "", '1': "", 'spec': []}
UPDATE_BOARD = ['','','','','','','','','']

def add_user(data):
    '''
    This method updates the global USER_NAME variable
    @data is the username 
    '''
    if ((USER_NAME['0'] == "") or (USER_NAME['0'] == str(data))):
        USER_NAME['0'] = str(data)
    elif ((USER_NAME['1'] == '') or (USER_NAME['1'] == str(data))):
        USER_NAME['1'] = str(data)
    else:
        if str(data) not in USER_NAME['spec']:
            USER_NAME['spec'].append(str(data))
    return USER_NAME

def add_user_to_db(username):
    '''
    This method is simply to query the username from the database check if the
    user is in there if its not there add it otherwise don't do anything. While
    youre adding to it, instantiating the scores to 100.
    @param username : the username that the user entered
    '''
    new_user = models.Person.query.filter_by(username=username).first()
    if new_user is None:
        new_user = models.Person(username=username, scores=100)
        db.session.add(new_user)
        db.session.commit()

def add_user_to_db_mock(username):
    '''
    This method is simply to mock the db
    @param username : the username that the user entered
    '''
    new_user = models.Person(username=username, scores=100)
    db.session.add(new_user)
    db.session.commit()
    
    database_players = models.Person.query.all()
    
    players = []
    for user in database_players:
        players.append(user.username)
    return players
    
def update_mock_board_index(data):
    '''
    This method is simply to mock the updated board
    @param data has the updated board
    '''
    UPDATE_BOARD = copy.copy(data)
    x_count = data.count('X')
    o_count = data.count('O')
    return x_count, o_count

def update_leaderboard():
    '''
    This method does not take any parameters and it basically updates the leaderboard
    using the users playing and their score and returns a list of objects within.
    @return players
    '''
    players = []
    data_base_data = models.Person.query.order_by(models.Person.scores.desc()).all()
    for user in data_base_data:
        players.append({user.username: user.scores})
    return players


CORS = CORS(app, resources={r"/*": {"origins": "*"}})
socket_io = SocketIO(app,
                     cors_allowed_origins="*",
                     json=json,
                     manage_session=False)


@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    '''
    This function runs the index.html file
    '''
    return send_from_directory('./build', filename)


# When a client connects from this Socket connection, this function is run
@socket_io.on('connect')
def on_connect():
    '''
    This function prints 'User connected!' when the @SOCKET_IO has connected with
    the front end
    '''
    print('User connected!')


# When a client disconnects from this Socket connection, this function is run
@socket_io.on('disconnect')
def on_disconnect():
    '''
    This function prints 'User disconnected!' when the @SOCKET_IO has disconnected with
    the front end
    '''
    print('User disconnected!')


@socket_io.on('gameStatus')
def game_status(data_leaderboard):
    '''
    This function gets called when there is a winner in the tic-tac-toe board
    and updates the leaderBoard by emmiting back to the front end where the win logic has
    been implemented
    @param data is a object which consists of winner and loser for the game played
    '''
    winner = data_leaderboard['win']
    loser = data_leaderboard['lose']
    db.session.query(models.Person)\
      .filter(models.Person.username == winner)\
      .update({models.Person.scores: models.Person.scores + 1})

    db.session.query(models.Person)\
      .filter(models.Person.username == loser)\
      .update({models.Person.scores: models.Person.scores - 1})
    db.session.commit()
    players = update_leaderboard()
    socket_io.emit('updateLeaderBoard', players, broadcast=True)


@socket_io.on('loginStatus')
def user_login(data):
    '''
    This method is used to update our global USER_NAME dictionary with the players playing
    and the spec, spectating and calls update_leaderboard to split up the jobs at will
    and emits the updated leaderboard and the users to the front end to update it there
    @param data is an object which contains the name of the user that wants to play or spectate
    '''
    user_names = add_user(data['name'])
    add_user_to_db(data['name'])
    players = update_leaderboard()
    socket_io.emit('updateLeaderBoard', players, broadcast=True)
    socket_io.emit('updateUser', user_names, broadcast=True, include_self=False)


@socket_io.on('boardChange')
def on_change(board_data):
    '''
    This method is called when there has been a change in the board, i.e,. userX input,
    userO input, reset board and so on.
    '''
    socket_io.emit('boardChange', board_data, boradcast=True, include_self=False)


if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    socket_io.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
