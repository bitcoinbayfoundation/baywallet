import { action, makeAutoObservable, observable, runInAction, when } from "mobx";
import { connectToRelays, getNostrKeys, getNotes, getProfile } from "../nostr";
import { NostrKeys, Profile } from "../types/nostr";
import { DataStore } from ".";
import { Relay } from "nostr-tools";
import { Event } from "../types/nostr";

export class NostrStore {
  rootStore: DataStore
  @observable nostrKeys: NostrKeys
  @observable me: Profile
  @observable relay: Relay
  @observable events: Event[] = []

  relays: string[] = [
    "wss://nostr.bitcoinbay.engineering"
  ]

  constructor(rootStore: DataStore) {
    this.rootStore = rootStore
    this.events = null
    this.connectToRelay()
    this.getNostrKeys()
    makeAutoObservable(this)
  }

  @action
  async getNostrKeys() {
    const account = await getNostrKeys()
    runInAction(() => {
      this.nostrKeys = account
    })
  }

  @action
  async getMe() {
    const profile = await this.getProfile("3f194d7cf5c59eca0145ed7804f0a67c0cc17b6ff6b4bd585821160dcf9d785b")
    runInAction(() => {
      this.me = profile
    })
    return profile
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
    runInAction(() => {
      this.events = events
    })
  }

  @action
  async getProfile(pubkey:string): Promise<Profile> {
    const profile = await getProfile(this.relay, pubkey)
    return profile
  }
}