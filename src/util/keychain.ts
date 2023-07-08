import * as Keychain from 'react-native-keychain';
import { TAccount } from "@synonymdev/react-native-ldk";
import { log } from './logger';
import { randomBytes } from 'crypto';
import * as bip39 from 'bip39';

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