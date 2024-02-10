// Login.js
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IconContext } from 'react-icons';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import '../Styles/Login.css';

const Login = () => {
  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') {
          return;
        } else {
          console.error('Error signing in with Google:', error.message);
        }
      });
  };

  return (
    <div id='login-page' className='login-background'>
      <div id='login-card' className='login-content'>
        <h2>Welcome to ChatSweep</h2>
        <p>
          ChatSweep is an awesome messaging app that allows you to connect with friends and colleagues easily. Sign in with your Google account to get started!
        </p>
        <div className="login-button google" onClick={handleSignInWithGoogle}>
          <IconContext.Provider value={{ className: 'google-logo' }}>
            <FcGoogle />
          </IconContext.Provider> Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default Login;
