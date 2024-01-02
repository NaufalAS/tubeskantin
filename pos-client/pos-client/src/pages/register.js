import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/Register.module.css';

const Navbar = () => {
  const router = useRouter();

  const handleButtonClick = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src="/reg.jpeg" alt="Email Icon" width={300} height={300} />
        <div>
          <p className={styles.bold}>LET’S GET STARTED</p>
          <p>Create An Account</p>
        </div>
      </div>

      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <p>Full Name</p>
          <div className={styles.inputContainer}>
            <Image src="/org.png" alt="Email Icon" width={20} height={20} />
            <input type="text" placeholder="Enter your email" className={styles.inputField} />
          </div>

          <p>Email Addres</p>
          <div className={styles.inputContainer}>
            <Image src="/kunci.png" alt="Password Icon" width={20} height={20} />
            <input type="password" placeholder="Enter your password" className={styles.inputField} />
          </div>

          <p>Pekerjaan</p>
          <div className={styles.inputContainer}>
            <Image src="/kotak.png" alt="Password Icon" width={20} height={20} />
            <input type="password" placeholder="Enter your password" className={styles.inputField} />
          </div>

          <p>Password:</p>
          <div className={styles.inputContainer}>
            <Image src="/kunci.png" alt="Password Icon" width={20} height={20} />
            <input type="password" placeholder="Enter your password" className={styles.inputField} />
          </div>

          <p>Confirm Password</p>
          <div className={styles.inputContainer}>
            <Image src="/kunci.png" alt="Password Icon" width={20} height={20} />
            <input type="password" placeholder="Enter your password" className={styles.inputField} />
          </div>
        </div>
        <button className={styles.cardLogin} onClick={() => handleButtonClick('/login')}>
          <span className={styles.loginText}>Register</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
