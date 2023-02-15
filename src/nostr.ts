import { runInAction } from "mobx"
import { generatePrivateKey, getPublicKey, Relay, relayInit } from "nostr-tools"
import { getItem, setItem } from "./storage"
import { NostrKeys, Event, Profile } from "./types/nostr"

const TIMEOUT = 3000
const LIMIT = 4

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

export const connectToRelays = async (relays: string[]): Promise<Relay> => {
  const relay = relayInit(relays[0])
  await relay.connect()
  relay.on('connect', () => {
    console.log(`Connected to ${relay.url}`)
  })
  return relay
}

export const getNotes = async (relay: Relay): Promise<Array<any>> => 
  new Promise((resolve) => {
    let fetchCount = 0
    const eventsById: Record<string, any> = {}
    const sub = relay.sub([{
      kinds: [1],
      authors: ["3f194d7cf5c59eca0145ed7804f0a67c0cc17b6ff6b4bd585821160dcf9d785b"]
    }])
    
    sub.on('event', event => {
      eventsById[event.id] = event
      fetchCount === 0
      fetchCount++
      if (fetchCount === LIMIT) {
        resolve(Array.from(Object.values(eventsById)))
        sub.unsub()
      }
    })
  })

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
