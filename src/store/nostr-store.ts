import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { connectToRelays, getNostrProfile, getNotes } from "../nostr";
import { NostrKeys } from "../types/nostr";
import { DataStore } from ".";
import { Relay } from "nostr-tools";
import { Event } from "../types/nostr";

export class NostrStore {
  rootStore: DataStore
  @observable nostrAccount: NostrKeys
  @observable relay: Relay
  @observable events: Event[]

  relays: string[] = [
    "wss://nostr.bitcoinbay.engineering"
  ]

  constructor(rootStore: DataStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  @action
  async getNostrProfile() {
    const account = await getNostrProfile()
    runInAction(() => {
      this.nostrAccount = account
    })
  }

  @action 
  async connectToRelay() {
    const relay = await connectToRelays(this.relays)
    runInAction(() => {
      this.relay = relay
    })
  }

  @action
  async getEvents() {
    const events = await getNotes(this.relay)
    console.log("store events")
    runInAction(() => {
      this.events = events
    })
  }
}