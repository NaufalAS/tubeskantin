// components/LogoutButton.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.css'; // Import the styles

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Lakukan tindakan logout sesuai kebutuhan Anda (contoh: hapus sesi pengguna, dll.)
    // ...

    // Set session storage to prevent going back
    sessionStorage.setItem('isLoggedOut', 'true');

    // Redirect ke halaman login setelah logout berhasil
    router.replace('/'); // Redirect to the home page (adjust if necessary)
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Check if the user is trying to navigate back
      if (url === router.asPath && !sessionStorage.getItem('isLoggedOut')) {
        // Redirect back to the home page (adjust if necessary)
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
    <div className={styles.logout} onClick={handleLogout}>
      Logout
    </div>
  );
};

export default LogoutButton;
