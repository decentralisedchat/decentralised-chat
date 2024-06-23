import React from 'react';
import styles from './style.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>Welcome to Decentralised Chat</h1>
    </header>
  );
};

export default Header;
