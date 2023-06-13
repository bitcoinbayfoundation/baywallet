export type NostrKeys = {
  pubkey: string
  privatekey: string
}

export type EventType = {
  profile: 0,
  note: 1
}

export type Event = {
  id?: string,
  kind: EventType,
  created_at: number,
  content: string,
  pubkey: string,
  tags: Array<Array<string>>,
  sig?: string
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