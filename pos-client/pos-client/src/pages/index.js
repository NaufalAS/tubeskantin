// File: components/Navbar.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/HomePage.module.css';

const Navbar = () => {
  const router = useRouter();

  const handleButtonClick = (path) => {
    // Clear session storage before navigating to the login page
    if (path === '/') {
      sessionStorage.removeItem('isLoggedOut');
    }

    router.push(path);
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Check if the user is trying to navigate back to the login page
      if (url === '/' && sessionStorage.getItem('isLoggedOut')) {
        // Redirect back to the home page (or another page as needed)
        router.replace('/');
      }
    };

    // Listen to route changes
    router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup the event listener on component unmount
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Image src="/polines.png" alt="Logo" width={50} height={50} priority />
        </div>
        <div className={styles.spacer} />
        <ul className={styles.ul}>
          <li className={styles.li}>Home</li>
          <li className={styles.li}>AboutUs</li>
          <li className={styles.li}>Tujuan</li>
        </ul>
      </nav>
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={() => handleButtonClick('/login')}>
          Go to Login
        </button>
        <button className={styles.button} onClick={() => handleButtonClick('/register')}>
          Go to Register
        </button>
      </div>
    </div>
  );
};

export default Navbar;
