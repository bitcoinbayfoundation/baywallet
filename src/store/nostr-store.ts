import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { getNostrProfile } from "../nostr";
import { NostrKeys } from "../types/nostr";
import { DataStore } from ".";

export class NostrStore {
  rootStore: DataStore
  @observable nostrAccount: NostrKeys

  constructor(rootStore: DataStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  @action
  async getNostrProfile() {
    const account = await getNostrProfile()
    console.log("Nostr account", account)
    runInAction(() => {
      this.nostrAccount = account
    })
  }
}