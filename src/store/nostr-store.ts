import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { connectToRelays, getNostrKeys, getNotes, getProfile } from "../nostr";
import { NostrKeys, Profile } from "../types/nostr";
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
    this.connectToRelay()
    makeAutoObservable(this)
  }

  @action
  async getNostrKeys() {
    const account = await getNostrKeys()
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
    console.log("store events", events[0])
    runInAction(() => {
      this.events = events
    })
    return events
  }

  @action
  async getProfile(pubkey:string): Promise<Profile> {
    const profile = await getProfile(this.relay, pubkey)
    return profile
  }
}