import React from 'react';
import styles from './style.module.css';

interface EmbedCodeBlockProps {
  publicKey?: string;
}

const EMBED_CODE = `<script>
  var w=window, d=document;
  w.decenChat = {
    appId: '__PUB_KEY__'
  };
  var e = function() {
    var s = document.createElement('script');
    s.src = 'https://client.decenchat.com/widget.js';
    d.body.appendChild(s);
  }
  d.readyState !== 'loading' ? e() : w.addEventListener("DOMContentLoaded", e);
</script>
`

const EmbedCodeBlock: React.FC<EmbedCodeBlockProps> = ({ publicKey }) => {
  const pubKey = publicKey ?? "<your public key>";
  const embedCode = EMBED_CODE.replace("__PUB_KEY__", pubKey);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    alert('Embed code copied to clipboard!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Embed Code</span>
        <button onClick={copyToClipboard} className={styles.copyButton}>Copy</button>
      </div>
      <pre className={styles.codeBlock}>
        {embedCode}
      </pre>
    </div>
  );
};

export default EmbedCodeBlock;
