import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS


userName = {"0":"",
            "1":"",
            'spec': []}
i = 0
usersLogged = False

def addSpectators(userName):
    userName['spec'] = list()
    userName['spec'].append(userName)
#FLASK
app = Flask(__name__, static_folder='./build/static')

#SOCKET_IO
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
    
@socketio.on('loginStatus')
def userLogin(data):
    # print(userName["0"])
    print(str(data))
    global i 
    global usersLogged 
    if(userName["0"] == ""):
        userName["0"] = str(data['name'])
    elif(userName["1"] == ""):
        userName["1"] = str(data['name'])
    else:
        userName['spec'].append(str(data['name']))
    
    print(userName)
    socketio.emit('updateUser', userName, broadcast=True, include_self=False)

@socketio.on('boardChange')
def onChange(boardData):
    print(str(boardData))
    socketio.emit('boardChange', boardData, boradcast=True, include_self=False)
    
socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)

