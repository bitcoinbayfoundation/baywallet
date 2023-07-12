import { NostrKeys } from '../types/nostr';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { generateNostKeyPair, getNostrKeys, storeNostrKeys } from '../util/keychain';
import { DataStore } from '.';

export class NostrKeyStore {
  rootStore: DataStore
  @observable nostrKeys: NostrKeys
  
  constructor(rootStore: DataStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
    this.getNostrKeys()
  }
  
  @action
  async getNostrKeys(): Promise<NostrKeys> {
    const keys = await getNostrKeys()
    runInAction(() => {
      this.nostrKeys = keys
    })
    return keys
  }

  @action
  async getKeysOrGenerate(privkey?:string) {
    let keys: NostrKeys
    keys = await this.getNostrKeys()
    if (!keys) {
      keys = await this.generateNostrKeys(privkey)
    }
    return keys
  }

  @action
  async saveNostrKeys(keys: NostrKeys): Promise<void> {
    await storeNostrKeys(keys)
    runInAction(() => {
      this.nostrKeys = keys
    })
  }

  private async generateNostrKeys(privkey?: string) {
    const keys = await generateNostKeyPair(privkey)
    runInAction(() => {
      this.nostrKeys = keys
    })
    return keys
  }
}