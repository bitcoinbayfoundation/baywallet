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
    "wss://nos.lol",
    "wss://relay.damus.io",
    "wss://eden.nostr.land",
    "wss://offchain.pub"
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
      // this.events = events
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

  @action 
  async getFollowingPubkeys() {
    const following = await getNostrEvents(this.relays, [{kinds: [Kind.Contacts], authors: ["3f194d7cf5c59eca0145ed7804f0a67c0cc17b6ff6b4bd585821160dcf9d785b"]}])
    const arrayOfFollowing = []
    if (following.length === 0) return
    following[0].tags.forEach(tag => {
      arrayOfFollowing.push(tag[1])
    })
    return arrayOfFollowing
  }

  @action
  async getFollowingFeed() {
    const following = await this.getFollowingPubkeys()
    const feed = await getNostrEvents(this.relays, [{kinds: [Kind.Text], authors: following}])
    runInAction(() => {
      this.events = feed
    })
    return feed
  }
}