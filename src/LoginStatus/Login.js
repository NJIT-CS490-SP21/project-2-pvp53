import { React, useRef } from 'react';
import './Login.css';

function Login({ userData }) {
  const users = userData;
  const user = useRef(null);

  return (
    <div className="loginBox">
      <h1 className="header">
        Let&apos;s Play!
      </h1>
      <input className="button" ref={user} id="userID" type="text" />
      <br />
      <button type="submit" className="button" onClick={() => users(user.current.value)}>
        LogIn
      </button>
    </div>
  );
}

export default Login;
