import React from "react";
import styles from "./style.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/decentralisedchat"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <p>Decentralised Chat is free and open source</p>
      </a>
    </footer>
  );
};

export default Footer;
