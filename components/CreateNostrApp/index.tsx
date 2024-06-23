import React, { useState } from 'react';
import styles from './style.module.css';

interface CreateNostrAppProps {
  onCreate: (appName: string) => void;
}

const CreateNostrApp: React.FC<CreateNostrAppProps> = ({ onCreate }) => {
  const [appName, setAppName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(appName);
  };

  return (
    <div className={styles.container}>
      <p>If you don't have a public key, create a Nostr app:</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Enter app name"
          value={appName}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Create</button>
      </form>
    </div>
  );
};

export default CreateNostrApp;
