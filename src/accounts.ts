import { TAccount } from '@synonymdev/react-native-ldk';
import { getItem, setItem } from './storage';
import { randomBytes } from "react-native-randombytes"
import * as bip39 from "bip39"

export const createNewAccount = async (): Promise<any> => {
  try {
    const accountName = "bay-wallet-0"
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
  await setItem(account.name, account.seed)
}

export const getAccount = async (name: string = "bay-wallet-0"): Promise<any> => {
  const item = await getItem(name)
  if (!item) return false
  return item
}

const generateSeed = async () => {
  const seed = randomBytes(32).toString("hex")
  return seed
}