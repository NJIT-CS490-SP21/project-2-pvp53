import { React, useState, useRef } from 'react';
import './Login.css';

function Login({ userData}){
    const users = userData
    let user = useRef(null)
    
    return (
        <div class="loginBox">
            <h1 class="header">Let's Play! </h1>
            <input class= "button" ref={user} id="userID" type="text" />
            <br/>
            <button class = "button" onClick = {() => users(user.current.value)} > LogIn </button>
        </div>
    );
}

export default Login;