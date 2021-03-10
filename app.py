import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv()) # This is to load your env variables from .env

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

# #GLOBAL VARIABLES
userName = {
    "0":"",
    "1":"",
    'spec': []
}

def addUsertoDB(username):
    new_user = models.Person.query.filter_by(username=username).first()
    if new_user == None:
        new_user = models.Person(username=username, scores=100)
        db.session.add(new_user)
        db.session.commit()
        

def updateLeadeBoard():
    players = []
    dbData = models.Person.query.order_by(models.Person.scores.desc()).all()
    for user in dbData:
        players.append({user.username : user.scores})
    return players

cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')
    
@socketio.on('gameStatus')
def on_join(data): # data is whatever arg you pass in your emit call on client
    winner = data['win']
    loser = data['lose']
    print(winner, loser)
    db.session.query(models.Person)\
      .filter(models.Person.username == winner)\
      .update({models.Person.scores: models.Person.scores + 1})
                   
    db.session.query(models.Person)\
      .filter(models.Person.username == loser)\
      .update({models.Person.scores: models.Person.scores - 1})
    db.session.commit()
    players = updateLeadeBoard()
    print(players)
    socketio.emit('updateLeaderBoard', players, broadcast=True)
    
@socketio.on('loginStatus')


def userLogin(data):
    global usersLogged 
    if((userName["0"] == "") or (userName["0"] == str(data['name']))):
        userName["0"] = str(data['name'])
    elif((userName["1"] == "") or (userName["1"] == str(data['name']))):
        userName["1"] = str(data['name'])
    else:
        if(str(data['name']) not in userName['spec']):
            userName['spec'].append(str(data['name']))
    
    addUsertoDB(data['name'])
    players = updateLeadeBoard()
    socketio.emit('updateLeaderBoard', players, broadcast=True)
    socketio.emit('updateUser', userName, broadcast=True, include_self=False)
    

@socketio.on('boardChange')
def onChange(boardData):
    socketio.emit('boardChange', boardData, boradcast=True, include_self=False)
    
    
if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )