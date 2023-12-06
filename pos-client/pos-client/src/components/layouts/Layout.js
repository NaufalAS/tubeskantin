// File: Layout.js
import React from 'react';
import { useRouter } from 'next/router';
import Home from './Home';

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
            {MENU_LIST.map((menu, index) => (
              <li
                key={index}
                className={router.pathname === menu.path ? styles.active : ''}
                onClick={() => handleCangePage(menu.path)}
              >
                {menu.name}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <section className={styles.content}>
        {/* Render Home component by default */}
        {router.pathname === '/' ? <Home /> : children}
      </section>
    </main>
  );
};

export default Layout;
