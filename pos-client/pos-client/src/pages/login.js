// Login.js

import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/Login.module.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; // Import the js-cookie library

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const result = await response.json();
      console.log('Login response:', result);
  
      const { role, id } = result?.payload || {};
  
      if (role === 'admin') {
        router.push('/homeadmin');
      } else if (role === 'mahasiswa') {
        // Adjust role to match your expected role
        router.push('/homeuser');
        Cookies.set('userInfo', { username, id, role });
      } else {
        // Handle unexpected role
        console.error('Unexpected role:', role);
      }
  
      // Clear session storage upon successful login
      sessionStorage.removeItem('isLoggedOut');
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error, show an alert, etc.
    }
  };
  

  return (
    <div className={styles.container}>
      <Image src="/ya.jpeg" alt="Email Icon" width={200} height={200} />
      <div className={styles.header}>
        <p className={styles.bold}>WELCOME BACK</p>
        <p>Log in to your existing Account</p>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <p>Username:</p>
          <div className={styles.inputContainer}>
            <Image src="/icon.png" alt="Email Icon" width={20} height={20} />
            <input
              type="text"
              placeholder="Enter your username"
              className={styles.inputField}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Password:</p>
          <div className={styles.inputContainer}>
            <Image src="/kunci.png" alt="Password Icon" width={20} height={20} />
            <input
              type="password"
              placeholder="Enter your password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.cardLogin} onClick={handleLogin}>
          <span className={styles.loginText}>Login</span>
        </button>
        <p>Don’t have an account? </p>
      </div>
    </div>
  );
};

export default Login;
