import { Filter, generatePrivateKey, getPublicKey, Kind, Relay, relayInit } from "nostr-tools"
import { getItem, setItem } from "./storage"
import { NostrKeys, Profile } from "./types/nostr"

const TIMEOUT = 3000
const LIMIT = 45

const createNostrKeys = async (): Promise<NostrKeys> => {
  const privatekey = generatePrivateKey()
  const pubkey = getPublicKey(privatekey)
  const nostrAccount: NostrKeys = {
    pubkey: pubkey,
    privatekey: privatekey
  }
  await setItem("nostr", JSON.stringify(nostrAccount))
  return nostrAccount
}

export const getNostrPubKey = async (): Promise<string> => {
  const pk = await getItem<string>("nostr")
  if (!pk) throw Error("No nostr keys stored.")
  const pubkey = getPublicKey(pk)
  return pubkey
}

export const getNostrKeys = async (): Promise<NostrKeys> => {
  let keys
  keys = await getItem<string | false>("nostr")
  if (!keys) keys = await createNostrKeys()
  return JSON.parse(keys)
}

export const connectToRelay = async (rel: string[]): Promise<any> => {
  const connectedRelays: Record<string, Relay> = {}
  await Promise.all(rel.map(async (relay) => {
    const conn = relayInit(relay)
    await conn.connect()
    conn.on('connect', () => {
      console.log(`Connected to ${relay}`)
      connectedRelays[relay] = conn
    })
    conn.on('error', () => {
      console.log(`Error connecting to ${relay}`)
    })
  }))

  return Array.from(Object.values(connectedRelays))  
}

export const getNostrEvents = async (relays: Relay[], filter: Filter[]): Promise<Array<any>> => {
  const eventsById: Record<string, any> = {}
  await Promise.all(relays.map(async relay => {
    const sub = await relay.list(filter)
    return sub.map(event => {
      eventsById[event.id] = event
    })
  }))
  
  return Array.from(Object.values(eventsById))
}
