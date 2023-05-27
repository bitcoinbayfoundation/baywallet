import {TAccount} from '@synonymdev/react-native-ldk';
import {randomBytes} from 'crypto';
import {action, makeObservable, observable, runInAction} from 'mobx';
import {getItem, setItem} from '../util/storage';
import * as bip39 from 'bip39';
import { DataStore } from '.';

enum Account {
  name = 'bay-wallet-0',
  currentAccountKey = 'current-account',
}

/**
 * AccountStore
 * 
 * This class handles the account functions of the app. 
 * 
 * The app has a selector for the active account. {@link Account} is stored in local storage
 * with the active account name. By default the first account created is `bay-wallet-0`. 
 * When a user has the ability to create more accounts the account names will increment 
 * by one ex. `bay-wallet-1`.
 * 
 * The account seed is stored in local storage under the `currentAccountKey` as of this
 * commit. Secure storage is needed in the future {@link https://www.npmjs.com/package/react-native-keychain#android}.
 * 
 */

export class AccountStore {
  rootStore: DataStore
  @observable account: TAccount = {name: '', seed: ''};
  @observable activeAccount: string = '';

  constructor(rootStore: DataStore) {
    this.rootStore = rootStore
    makeObservable(this);
  }

  @action
  async setActiveAccount(account: TAccount) {
    const storeAccount = await setItem(Account.currentAccountKey, account.name);
    runInAction(() => {
      this.activeAccount = account.name;
    });
    return storeAccount;
  }

  @action
  async getAccount(): Promise<any> {
    const account = await getItem<string>(Account.currentAccountKey);
    if (account) return JSON.parse(account);
    const newAccount = await this.createNewAccount();
    return newAccount;
  }

  @action
  async createNewAccount(name?: string): Promise<any> {
    const firstAccount = await getItem(Account.name);
    if (firstAccount) return firstAccount;
    if (!name) throw new Error('Need to supply a name for new wallet.');
    try {
      const account: TAccount = {
        name: name,
        seed: this.generateSeed(),
      };

      await this.setAccount(account);
      return account;
    } catch (e) {
      console.error('COULD NOT CREATE ACCOUNT', e);
      return 'Create wallet failed.';
    }
  }

  @action
  async setAccount({name, seed}: TAccount) {
    const account: TAccount = {
      name: name,
      seed: seed,
    };
    // await Keychain.setGenericPassword(name, JSON.stringify(account), {service: name})
    await setItem(Account.currentAccountKey, account);
  }

  generateSeed() {
    const seed = randomBytes(32).toString('hex');
    return seed;
  }

  getNmemonicFromSeed(seed: string) {
    return bip39.entropyToMnemonic(seed);
  }
}
