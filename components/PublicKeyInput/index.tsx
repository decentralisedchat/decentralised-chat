import React, { useState } from 'react';
import styles from './style.module.css';

interface PublicKeyInputProps {
  setPublicKey: (key: string) => void;
}

const PublicKeyInput: React.FC<PublicKeyInputProps> = ({ setPublicKey }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPublicKey(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Enter your public key"
        value={inputValue}
        onChange={handleChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Submit</button>
    </form>
  );
};

export default PublicKeyInput;
