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

export type Profile = {
  lud06?: string,
  website?: string,
  picture?: string,
  display_name?: string,
  about?: string,
  name?: string,
  nip05?: string,
  pubkey: string
}