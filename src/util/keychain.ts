import * as Keychain from 'react-native-keychain';
import { TAccount } from "@synonymdev/react-native-ldk";
import { log } from './logger';
import { randomBytes } from 'crypto';
import * as bip39 from 'bip39';
import { generatePrivateKey, getPublicKey, nip19 } from 'nostr-tools';
import { NostrKeys } from '../types/nostr';

/**
 * Lightning Keychain
 */

export const generateSeed = (): string => {
  const seed = randomBytes(32).toString('hex');
  return seed;
}

export const seedToMnemonic = (seed: string): string => {
  return bip39.entropyToMnemonic(seed)
}

export const storeLightningKeys = async ({name, seed}: TAccount): Promise<boolean> => {
  try {
    const storeKeys = await Keychain.setGenericPassword(name, JSON.stringify({name, seed}), {service: 'lightning'});
    if (!storeKeys) {
      log.error(`Failed to store lightning keys for keypair ${name}`)
      return false
    }
    return true
  } catch (e) {
    log.error(`Failed to store lightning keys for keypair ${name} w/ error: ${e}`)
    return false 
  }
}

export const getLightningKeys = async (name: string = "bay-wallet"): Promise<TAccount | null> => {
  try {
    const keys = await Keychain.getGenericPassword({service: 'lightning'});
    if (!keys) {
      log.error(`Failed to get lightning keys for keypair ${name}`)
      return null
    }
    return JSON.parse(keys.password)
  } catch (e) {
    log.error(`Failed to get lightning keys for keypair ${name} w/ error: ${e}`)
    return null
  }
}

/**
 * Nostr Keychain
 */

export const generateNostKeyPair = (privkey?: string): NostrKeys => {
  if (!privkey) privkey = generatePrivateKey()
  const pubkey = getPublicKey(privkey)
  const nostrAccount: NostrKeys = {
    pubkey: pubkey,
    privatekey: privkey,
    npub: nip19.npubEncode(pubkey),
    nsec: nip19.nsecEncode(privkey)
  }
  return nostrAccount
}

export const storeNostrKeys = async (nostrKeys: NostrKeys): Promise<boolean> => {
  try {
    const storeKeys = await Keychain.setGenericPassword("nostr-keys", JSON.stringify(nostrKeys), {service: 'nostr'});
    if (!storeKeys) {
      log.error("Failed to store lightning keys for nostr key pair")
      return false
    }
    return true
  } catch (e) {
    log.error(`Failed to store lightning keys for nostr key pair w/ error: ${e}`)
    return false 
  }
}

export const getNostrKeys = async (name: string = "nostr"): Promise<NostrKeys | null> => {
  try {
    const keys = await Keychain.getGenericPassword({service: name});
    if (!keys) {
      log.error("Failed to get lightning keys for nostr key pair")
      return null
    }
    return JSON.parse(keys.password)
  } catch (e) {
    log.error(`Failed to get lightning keys for nostr key pair w/ error: ${e}`)
    return null
  }
}
