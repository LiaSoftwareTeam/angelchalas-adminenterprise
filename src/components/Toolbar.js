import React from 'react';
import styles from './Toolbar.module.css';

const Toolbar = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchContainer}>
        <svg xmlns="http://www.w3.org/2000/svg" className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Buscar..." className={styles.searchInput} />
      </div>
      <div className={styles.userProfile}>
        <span className={styles.userName}>Usuario</span>
        <div className={styles.avatar}>
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.avatarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;