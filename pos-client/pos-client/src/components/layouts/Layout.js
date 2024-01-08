// components/Layout.js

import React from 'react';
import { useRouter } from 'next/router';
import styles from './ok.module.css';
import { MENU_USER } from './filenew';
import LogoutButton from './LogoutButton'; // Import LogoutButton component

const Layout = ({ children }) => {
    const router = useRouter();

    const handleCangePage = (path) => {
      router.push(path);
    };

    return (
        <main className={styles.layout}>
         <aside className={styles.sidebar}>
            <nav className={styles.sidebar__nav}>
              <ul>
                {MENU_USER.map((menu, index) => (
                  <li 
                    key={index} 
                    className={router.pathname === menu.path ? styles.active : ''} 
                    onClick={() => handleCangePage(menu.path)}
                  >
                    {menu.icon} {/* Display the icon */}
                    {menu.name}
                  </li>
                ))}
                {/* Gunakan komponen LogoutButton di sini */}
                <LogoutButton />
              </ul>
            </nav>
         </aside>
         <section className={styles.content}>{children}</section>
        </main>
      );
};

export default Layout;
