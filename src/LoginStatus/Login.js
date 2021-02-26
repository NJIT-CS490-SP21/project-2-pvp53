import { React, useState, useRef } from 'react';

function Login({ userData}){
    const users = userData
    let user = useRef(null)
    
    return (
        <div>
            <input ref={user} id="userID" type="text" />
            <button onClick = {() => users(user.current.value)} > LogIn </button>
        </div>
    );
}

export default Login;