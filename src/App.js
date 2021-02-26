import { useState, useEffect } from 'react';
import { Board } from './';
import { Login } from './';
import io from 'socket.io-client';
import './App.css';

const socket = io(); // Connects to socket connection

function App() {

    const [ user, setUser] = useState("");
    const [ loggedIn, setLoginStatus] = useState(false);

    function fillUser(userName){
        setUser(userName);
        setLoginStatus(!loggedIn);
        socket.emit('loginStatus', {name: userName});
    }

    return (
    <div class = "square">
      {loggedIn
        ? <Board user={user}/>
        : <Login userData={fillUser}  />
      }
    </div>
    );
}
export default App;