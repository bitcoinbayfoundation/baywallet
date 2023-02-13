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
  constent: string,
  tags: Array<Array<string>>,
  sig?: string
}