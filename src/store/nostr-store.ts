import { action, makeAutoObservable, observable, runInAction, when } from "mobx";
import { connectToRelay, getNostrKeys, getNostrEvents } from "../nostr";
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
  async connectToRelays() {
    const relays = await connectToRelay(this.relayUrls)
    runInAction(() => {
      this.relays = relays
    })
  }

  @action
  async getAllEvents() {
    const events = await getNostrEvents(this.relays, [{kinds: [Kind.Text]}])
    runInAction(() => {
      this.events = events
    })
  }

  @action 
  async getMe() {
    const me = await getNostrEvents(this.relays, [{kinds: [Kind.Metadata], authors: [this.nostrKeys.pubkey]}])
    return me[0]
  }

  @action
  async getProfile(pubkey:string): Promise<Event> {
    const profile = await getNostrEvents(this.relays, [{kinds: [Kind.Metadata], authors: [pubkey]}])
    return profile[0]
  }
}