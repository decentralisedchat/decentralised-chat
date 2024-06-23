import React, { useState } from 'react';
import styles from './style.module.css';
import { npubToHex } from '../../utils/nostr';

interface PublicKeyInputProps {
  setPublicKey: (key: string) => void;
}

const PublicKeyInput: React.FC<PublicKeyInputProps> = ({ setPublicKey }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) {
      const hexKey = inputValue.startsWith('npub') ? npubToHex(inputValue) : inputValue;
      setPublicKey(hexKey);
    }
  };

  return (
    <div className={styles.publicKeyInput}>
      <p className={styles.infoText}>
        Try out your widget app now! Enter your public key below and wait a few seconds for the chat icon to appear at the bottom right corner.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Enter your public key"
          value={inputValue}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PublicKeyInput;
