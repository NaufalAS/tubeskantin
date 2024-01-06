// Import necessary dependencies
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/Register.module.css';

// Create the register component
const Register = () => {
  // Initialize state for form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '', // Make sure the 'role' field is included in your form
    password: '',
    confirm_password: '',
  });

  // Initialize Next.js router
  const router = useRouter();

  // Function to handle input changes
  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };


// Function to handle registration button click
// Function to handle registration button click
// Function to handle registration button click
const handleButtonClick = async () => {
  try {
    const response = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    // Log the entire data received from the server
    console.log('Server Response Data:', data);

    if (response.ok) {
      // Registration successful
      // Check user role and redirect accordingly
      const role = data?.payload?.role || data.role || formData.role;

      console.log('Role:', role);  // Log the role for debugging

      if (role === 'admin') {
        router.push('/homeadmin');
      } else {
        router.push('/homeuser');
      }
    } else {
      // Handle registration error, display error message to the user
      console.error('Registration error:', data.error);
      // You might want to set an error state and display a message to the user
    }
  } catch (error) {
    console.error('Error during registration:', error);
    // Handle general error, display error message to the user
    // You might want to set an error state and display a message to the user
  }
};





  // Render the registration form
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
            <input
              type="text"
              placeholder="Enter your full name"
              className={styles.inputField}
              value={formData.username}
              onChange={(e) => handleInputChange(e, 'username')}
            />
          </div>

          <p>Email Address</p>
          <div className={styles.inputContainer}>
            <Image src="/kunci.png" alt="Password Icon" width={20} height={20} />
            <input
              type="text"
              placeholder="Enter your email"
              className={styles.inputField}
              value={formData.email}
              onChange={(e) => handleInputChange(e, 'email')}
            />
          </div>

          <p>Pekerjaan</p>
          <div className={styles.inputContainer}>
            <Image src="/kunci.png" alt="Password Icon" width={20} height={20} />
            <input
              type="text"
              placeholder="Enter your role"
              className={styles.inputField}
              value={formData.role}
              onChange={(e) => handleInputChange(e, 'role')}
            />
          </div>

          <p>Password:</p>
          <div className={styles.inputContainer}>
            <Image src="/kunci.png" alt="Password Icon" width={20} height={20} />
            <input
              type="password"
              placeholder="Enter your password"
              className={styles.inputField}
              value={formData.password}
              onChange={(e) => handleInputChange(e, 'password')}
            />
          </div>

          <p>Confirm Password</p>
          <div className={styles.inputContainer}>
            <Image src="/kunci.png" alt="Password Icon" width={20} height={20} />
            <input
              type="password"
              placeholder="Confirm your password"
              className={styles.inputField}
              value={formData.confirm_password}
              onChange={(e) => handleInputChange(e, 'confirm_password')}
            />
          </div>
        </div>
        <button className={styles.cardLogin} onClick={handleButtonClick}>
          <span className={styles.loginText}>Register</span>
        </button>
      </div>
    </div>
  );
};

// Export the Register component
export default Register;
