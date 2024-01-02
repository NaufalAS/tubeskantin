import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/Login.module.css';

const Navbar = () => {
  const router = useRouter();

  const handleButtonClick = (path) => {
    router.push(path);
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
          <p>Email:</p>
          <div className={styles.inputContainer}>
            <Image src="/icon.png" alt="Email Icon" width={20} height={20} />
            <input type="text" placeholder="Enter your email" className={styles.inputField} />
          </div>

          <p>Password:</p>
          <div className={styles.inputContainer}>
            <Image src="/kunci.png" alt="Password Icon" width={20} height={20} />
            <input type="password" placeholder="Enter your password" className={styles.inputField} />
          </div>
        </div>
        <button className={styles.cardLogin} onClick={() => handleButtonClick('/login')}>
          <span className={styles.loginText}>Login</span>
        </button>
        <p>Don’t have an account? </p>
      </div>
    </div>
  );
};

export default Navbar;
