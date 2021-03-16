import { React, useState } from 'react';
import io from 'socket.io-client';
// import { Board, Login } from './index';
import Board from './Board/Board';
import Login from './LoginStatus/Login';
import './App.css';

const socket = io(); // Connects to socket connection

function App() {
  const [user, setUser] = useState('');
  const [loggedIn, setLoginStatus] = useState(false);

  function fillUser(userName) {
    setUser(userName);
    setLoginStatus(!loggedIn);
    socket.emit('loginStatus', { name: userName });
  }

  return (
    <div>
      <div className="t">
        <h1>Tic-Tac-Toe</h1>
      </div>
      {loggedIn ? <Board user={user} /> : <Login userData={fillUser} />}
    </div>
  );
}
export default App;
