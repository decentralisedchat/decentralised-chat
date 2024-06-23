import React, { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import PublicKeyInput from "../components/PublicKeyInput";
// import CreateNostrApp from "../components/CreateNostrApp";
import EmbedCodeBlock from "../components/EmbedCodeBlock";
import Footer from "../components/Footer";
// import { createApp } from "../utils/nostr";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  const [publicKey, setPublicKey] = useState<string>();
  // const [appName, setAppName] = useState<string | null>(null);
  // const [nostrKeys, setNostrKeys] = useState<{
  //   publicKey: string;
  //   secretKey: string;
  // } | null>(null);

  // const handleCreateNostrApp = async (appName: string) => {
  //   setAppName(appName);
  //   const { sk, pk } = await createApp(appName);
  //   setNostrKeys({
  //     publicKey: pk,
  //     secretKey: sk,
  //   });
  // };

  return (
    <div className={styles.container}>
      <Head>
        <title>Decentralised Chat</title>
        <meta
          name="description"
          content="Generate embedding code for Decentralised Nostr Chat app"
        />
        <link rel="icon" href="/favicon.ico" />
        {publicKey && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                var w = window, d = document;
                w.decenChat = { appId: ${JSON.stringify(publicKey)} };
                var e = function() {
                  var s = document.createElement('script');
                  s.src = 'https://client.decenchat.com/widget.js';
                  d.body.appendChild(s);
                }
                d.readyState !== 'loading' ? e() : w.addEventListener("DOMContentLoaded", e);
              `,
            }}
          />
        )}
      </Head>

      <Header />
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Easily integrate a live chat support system into your website with
            Decentralised Chat. Use your existing public key or create a new one
            to get started and respond to customer inquiries using any Nostr
            social media app.
          </p>
        </div>
        <PublicKeyInput setPublicKey={setPublicKey} />
        {/* {!nostrKeys ? (
          <CreateNostrApp onCreate={handleCreateNostrApp} />
        ) : (
          <div className={styles.keys}>
            <p>
              <strong>Public Key:</strong> {nostrKeys.publicKey}
            </p>
            <p>
              <strong>Secret Key:</strong> {nostrKeys.secretKey}
            </p>
            <p className={styles.warning}>
              Save your secret key securely. You won't be able to retrieve it
              again.
            </p>
          </div>
        )} */}
        <EmbedCodeBlock publicKey={publicKey} />
        <div className={styles.notes}>
          <p>
            <strong>Coming Soon:</strong>
          </p>
          <p>
            1. We will shortly release a widget builder to customize the widget
            theme according to your brand's style.
          </p>
          <p>
            2. Development of the agent panel is currently in progress.
            Meanwhile, you can use any Nostr social media app (e.g., Primal,
            Damus) to respond to customers.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
