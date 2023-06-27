import {generatePrivateKey, getPublicKey} from 'nostr-tools';
import {NostrKeys} from '../types/nostr';
import {getItem, setItem} from '../util/storage';
import {observable} from 'mobx';

export class NostrKeyStore {
  @observable nostrKeys: NostrKeys = {
    pubkey: '43c32ed61a8259ddaef6eb43c1c3114524c09690cbb92c57196b395abf73c527',
    privatekey:
      '3b06fde1e2eecc30bc6e14e16256ef1c9169d032bada5023c434a4c9be482f1a',
  };
  constructor() {}

  async createNostrKeys(): Promise<NostrKeys> {
    const privatekey = generatePrivateKey();
    const pubkey = getPublicKey(privatekey);
    const nostrAccount: NostrKeys = {
      pubkey: pubkey,
      privatekey: privatekey,
    };
    await setItem('nostr', JSON.stringify(nostrAccount));
    return nostrAccount;
  }

  async getNostrPubKey(): Promise<string> {
    const pk = await getItem<string>('nostr');
    if (!pk) {
      throw Error('No nostr keys stored.');
    }
    const pubkey = getPublicKey(pk);
    return pubkey;
  }

  async getNostrKeys(): Promise<NostrKeys> {
    let keys;
    keys = await getItem<string | false>('nostr');
    if (!keys) {
      keys = await this.createNostrKeys();
    }
    return JSON.parse(keys);
  }
}
