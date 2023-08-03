import { Event } from "nostr-tools"

export type NostrKeys = {
  pubkey: string
  privatekey: string
  nsec: string
  npub: string
}

export type BayWalletPost = Event & {
  imageUrls?: string[],
  links?: string[]
  references?: any[]
  eventTags?: Tags
}

export type Tags = {
  eTags: string[],
  pTags: string[],
  qTags: string[]
}

export type Replies = {
  parentReplies: Event[],
  childReplies: Event[]
}

export type EventType = {
  profile: 0,
  note: 1
}

export interface Metadata {
  name?: string
  username?: string
  display_name?: string
  picture?: string
  banner?: string
  about?: string
  website?: string
  lud06?: string
  lud16?: string
  nip05?: string
  pubkey?: string
}