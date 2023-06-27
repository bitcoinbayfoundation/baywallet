import {TAccount} from '@synonymdev/react-native-ldk';
import {randomBytes} from 'crypto';
import {action, makeObservable, observable, runInAction} from 'mobx';
import {getItem, setItem} from '../util/storage';
import * as bip39 from 'bip39';
import {DataStore} from '.';
import {NostrKeyStore} from './nostr-key-store';

enum LdkWallet {
  name = 'bay-wallet-0',
  currentWalletKey = 'current-account',
}

/**
 * KeyStore
 *
 * This class handles the account functions of the app.
 *
 * The app has a selector for the active account. {@link LdkWallet} is stored in local storage
 * with the active account name. By default the first account created is `bay-wallet-0`.
 * When a user has the ability to create more accounts the account names will increment
 * by one ex. `bay-wallet-1`.
 *
 * The account seed is stored in local storage under the `currentAccountKey` as of this
 * commit. Secure storage is needed in the future {@link https://www.npmjs.com/package/react-native-keychain#android}.
 *
 */

export class KeyStore extends NostrKeyStore {
  rootStore: DataStore;
  @observable ldkWallet: TAccount = {name: '', seed: ''};
  @observable activeLdkWallet: string = '';

  constructor(rootStore: DataStore) {
    super();
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action
  async setActiveLdkWallet(account: TAccount) {
    const storeAccount = await setItem(
      LdkWallet.currentWalletKey,
      account.name,
    );
    runInAction(() => {
      this.activeLdkWallet = account.name;
    });
    return storeAccount;
  }

  @action
  async getLdkWallet(): Promise<any> {
    const wallet = await getItem<string>(LdkWallet.currentWalletKey);
    if (wallet) {
      return JSON.parse(wallet);
    }
    const newWallet = await this.createNewLdkWallet(LdkWallet.name);
    return newWallet;
  }

  @action
  async createNewLdkWallet(name?: string): Promise<TAccount> {
    const firstAccount = await getItem(LdkWallet.name);
    if (firstAccount) {
      return JSON.parse(firstAccount);
    }
    if (!name) {
      throw new Error('Need to supply a name for new wallet.');
    }
    try {
      const account: TAccount = {
        name: name,
        seed: this.generateSeed(),
      };

      await this.setLdkWallet(account);
      return account;
    } catch (e) {
      console.error('COULD NOT CREATE ACCOUNT', e);
      return;
    }
  }

  @action
  async setLdkWallet({name, seed}: TAccount) {
    const ldkWallet: TAccount = {
      name: name,
      seed: seed,
    };
    // await Keychain.setGenericPassword(name, JSON.stringify(account), {service: name})
    await setItem(LdkWallet.currentWalletKey, JSON.stringify(ldkWallet));
  }

  generateSeed() {
    const seed = randomBytes(32).toString('hex');
    return seed;
  }

  getNmemonicFromSeed(seed: string) {
    return bip39.entropyToMnemonic(seed);
  }
}
