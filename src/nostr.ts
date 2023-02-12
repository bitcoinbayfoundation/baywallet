import { generatePrivateKey, getPublicKey } from "nostr-tools"
import { getItem, setItem } from "./storage"
import { NostrKeys } from "./types/nostr"

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

export const connectToRelays = () => {

}