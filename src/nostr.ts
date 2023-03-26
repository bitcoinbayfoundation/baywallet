import { generatePrivateKey, getPublicKey, Kind, Relay, relayInit } from "nostr-tools"
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

export const getEvents = async (relays: Relay[]): Promise<Array<any>> => {
  let fetchCount = 0
  const eventsById: Record<string, any> = {}
  await Promise.all(relays.map(async relay => {
    const sub = await relay.list([{
      kinds: [Kind.Text],
    }])

    return sub.map(event => {
      eventsById[event.id] = event
    })
  }))
  
  return Array.from(Object.values(eventsById))
}

export const getProfile = async (relay: Relay, pubkey: string): Promise<Profile> => 
  new Promise((resolve) => {
    const sub = relay.sub([{
      kinds: [0],
      authors: [pubkey]
    }])

    sub.on('event', event => {
      const profile = <string>event.content
      // console.log(`Found profile ${JSON.stringify(event)}`)
      resolve(JSON.parse(profile))

      sub.unsub()
    })
  })
