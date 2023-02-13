import { runInAction } from "mobx"
import { generatePrivateKey, getPublicKey, Relay, relayInit } from "nostr-tools"
import { getItem, setItem } from "./storage"
import { NostrKeys, Event } from "./types/nostr"

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

export const getNostrProfile = async (): Promise<NostrKeys> => {
  let privateKey
  privateKey = await getItem<string | false>("nostr")
  if (!privateKey) privateKey = await createNostrKeys()
  return privateKey
}

export const connectToRelays = async (relays: string[]): Promise<Relay> => {
  const relay = relayInit(relays[0])
  await relay.connect()
  relay.on('connect', () => {
    console.log(`Connected to ${relay.url}`)
  })
  return relay
}

export const getNotes = async (relay: Relay): Promise<Event[]> => {
  return new Promise((resolve) => {
    let events: Event[]

    const sub = relay.sub([{
      kinds: [1],
      authors: ["3f194d7cf5c59eca0145ed7804f0a67c0cc17b6ff6b4bd585821160dcf9d785b"]
    }])
    
    sub.on('event', event => {
      resolve(event)
      events.push(event)
      sub.unsub()
    })
    resolve(events)
  })
}