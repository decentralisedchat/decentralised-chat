import {
  generateSecretKey,
  getPublicKey,
  SimplePool,
  finalizeEvent,
} from "nostr-tools";
import { bech32 } from "bech32";

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

export function npubToHex(npubKey: string): string {
  try {
    const { prefix, words } = bech32.decode(npubKey);
    if (prefix !== "npub") {
      throw new Error("Invalid npub key prefix");
    }
    const data = bech32.fromWords(words);
    return Buffer.from(data).toString("hex");
  } catch (error) {
    console.error("Failed to convert npub to hex:", error);
    return npubKey; // Return original key if conversion fails
  }
}
