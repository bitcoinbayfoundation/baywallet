import { NostrKeys } from '../types/nostr';
import { makeAutoObservable, observable, runInAction } from 'mobx';
import { getNostrKeys } from '../util/keychain';
import { DataStore } from '.';

export class NostrKeyStore {
  rootStore: DataStore
  @observable nostrKeys: NostrKeys
  
  constructor(rootStore: DataStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
    this.getNostrKeys()
  }

  async getNostrKeys(): Promise<NostrKeys> {
    const keys = await getNostrKeys()
    runInAction(() => {
      this.nostrKeys = keys
    })
    return keys
  }
}