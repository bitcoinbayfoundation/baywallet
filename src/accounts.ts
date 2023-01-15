import { TAccount } from '@synonymdev/react-native-ldk';
import { getItem, setItem } from './storage';
import { randomBytes } from "react-native-randombytes"
import * as bip39 from "bip39"
import { Account } from './types/electrs';


export const getAccount = async (): Promise<any> => {
  const account = await getItem(Account.currentAccountKey)
  if (account) return JSON.parse(account)
  const newAccount = await createNewAccount()
  return newAccount
}

export const createNewAccount = async (): Promise<any> => {
  try {
    const accountName = "bay-wallet-3"
    const account: TAccount = {
      name: accountName,
      seed: await generateSeed()
    }
    
    await setAccount(account)
    return account
  } catch (e) {
    console.error("COULD NOT CREATE ACCOUNT", e)
    return "Create wallet failed."
  }
}

export const setAccount = async ({name, seed}: TAccount) => {
  const account: TAccount = {
    name: name,
    seed: seed
  }
  // await Keychain.setGenericPassword(name, JSON.stringify(account), {service: name})
  await setItem(Account.currentAccountKey, JSON.stringify(account))
}

const generateSeed = async () => {
  const seed = randomBytes(32).toString("hex")
  return seed
}

export const getNmemonicFromSeed = (seed:string) => {
  return bip39.entropyToMnemonic(seed)
}