import {
  generateSecretKey,
  getPublicKey,
  SimplePool,
  finalizeEvent,
} from "nostr-tools";

const defaultRelays = [
  "wss://relay.damus.io/",
  "wss://relay.primal.net/",
  "wss://nos.lol",
  "wss://relay.nostr.wirednet.jp/",
  "wss://nostr-01.yakihonne.com",
  "wss://relay.hllo.live",
  "wss://relay.nostr.band",
  "wss://relay.mutinywallet.com",
];

const bufferToHex = (buffer: any) => {
  return Array.prototype.map
    .call(buffer, (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
};

export const generateKeys = () => {
  const sk = generateSecretKey();
  const pk = getPublicKey(sk);
  return { sk, pk };
};

export const createApp = async (appName: string) => {
  try {
    const { sk, pk } = generateKeys();
    const event = {
      kind: 0,
      content: JSON.stringify({
        name: `${appName.split(" ").join("")}`,
        display_name: appName,
      }),
      pubkey: pk,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
    };
    const signedEvent = finalizeEvent(event, sk);
    const pool = new SimplePool();
    await pool.publish(defaultRelays, signedEvent);
    // setTimeout(() => pool.close(defaultRelays), 300);
    return { sk: bufferToHex(sk), pk };
  } catch (e) {
    console.log("Error: ", e);
    return {};
  }
};
