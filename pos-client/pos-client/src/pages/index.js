// File: Navbar.js
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/HomePage.module.css';

const Navbar = () => {
  const router = useRouter();

  const handleButtonClick = (path) => {
    router.push(path);
  };

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}> {/* Adjust the class name */}
          <Image src="/polines.png" alt="Logo" width={50} height={50} priority />
        </div>
        <div className={styles.spacer} />
        <ul className={styles.ul}>
          <li className={styles.li}>Home</li>
          <li className={styles.li}>AboutUs</li>
          <li className={styles.li}>Tujuan</li>
        </ul>
      </nav>
      <div className={styles.buttonsContainer}> {/* Adjust the class name */}
        <button className={styles.button} onClick={() => handleButtonClick('/login')}>Go to Login</button>
        <button className={styles.button} onClick={() => handleButtonClick('/register')}>Go to Register</button>
      </div>
    </div>
  );
};

export default Navbar;
