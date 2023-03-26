import { action, makeAutoObservable, observable, runInAction, when } from "mobx";
import { connectToRelay, getNostrKeys, getEvents, getProfile } from "../nostr";
import { NostrKeys, Profile } from "../types/nostr";
import { DataStore } from ".";
import { Kind, Relay, SimplePool, Event } from "nostr-tools";
// import { Event } from "../types/nostr";

export class NostrStore {
  rootStore: DataStore
  @observable nostrKeys: NostrKeys
  @observable me: Profile
  @observable relays: Relay[]
  @observable events: Event[] = []
  pool: SimplePool

  relayUrls: string[] = [
    "wss://nostr.bitcoinbay.engineering",
    "wss://nos.lol"
  ]

  constructor(rootStore: DataStore) {
    this.rootStore = rootStore
    this.events = null
    this.connectToRelays()
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
    // const profile = await this.getProfile("3f194d7cf5c59eca0145ed7804f0a67c0cc17b6ff6b4bd585821160dcf9d785b")
    // runInAction(() => {
    //   this.me = profile
    // })
    // return profile
  }

  @action 
  async connectToRelays() {
    const relays = await connectToRelay(this.relayUrls)
    runInAction(() => {
      this.relays = relays
    })
  }

  @action
  async getEvents() {
    const events = await getEvents(this.relays)
    runInAction(() => {
      this.events = events
    })
  }

  @action
  async getProfile(pubkey:string) {
    const profile = await getProfile(this.relays[1], pubkey)
    return profile
  }
}