import { useEffect, useState } from "react"
import { generateNostKeyPair, getNostrKeys, storeNostrKeys } from "../util/keychain"
import { NostrKeys } from "../types/nostr"


export const useNostrKeys = (privkey?: string) => {
  const [nostrKeys, setNostrKeys] = useState<NostrKeys>(null)

  const generateNostrKeys = async () => {
    const keys = await generateNostKeyPair(privkey)
    setNostrKeys(keys)
    return keys
  }

  const getNostrKeysFromKeychain = async () => {
    const keys = await getNostrKeys()
    if (!keys) return null
    setNostrKeys(keys)
    return keys
  }

  const getKeys = async () => {
    const keychain = await getNostrKeysFromKeychain()
    if (!keychain) {
      await generateNostrKeys()
    }
    return
  }

  const saveKeys = async () => storeNostrKeys(nostrKeys)

  useEffect(() => {
    getKeys()
  }, [])

  return { nostrKeys, saveKeys }
}