import { TAccount } from "@synonymdev/react-native-ldk";
import { getItem, setItem } from "../util/storage";
import * as bip39 from "bip39"
import { randomBytes } from "crypto";
import * as Keychain from 'react-native-keychain';
import { log } from "./logger";

enum Wallet {
  name = 'bay-wallet',
  currentWalletKey = 'current-account',
}

export async function setActiveWallet(account: TAccount) {
  const setCurrentWallet = await setItem(Wallet.currentWalletKey, account.name);
  return setCurrentWallet;
}

export async function setWallet({name, seed}: TAccount): Promise<boolean> {
  const account: TAccount = {
    name: name,
    seed: seed,
  };
  
  try {
    const keychain = await Keychain.setGenericPassword(name, JSON.stringify(account), {service: name})
    console.log("KEYCHAIN", keychain)
    if (!keychain || keychain?.service !== name || keychain?.storage !== "keychainn") {
      return false
    }

    return true
  } catch (e) {
    log.keys(`Could not set wallet: ${e}`)
    return false
  }
}



export async function getAccount(name: string): Promise<any> {
  const keychain = await Keychain.getGenericPassword({ service: name });
  console.log("KEYCHAIN GETACCOUNT", keychain)
  if (!!keychain && keychain?.password) {
			// Return existing account.
			return JSON.parse(keychain?.password);
	}
}

export async function createNewAccount(name?: string): Promise<any> {
  const firstAccount = await getItem<string>(name);
  if (firstAccount) return JSON.parse(firstAccount);
  if (!name) throw new Error('Need to supply a name for new wallet.');
  try {
    const account: TAccount = {
      name: name,
      seed: generateSeed(),
    };

    await setAccount(account);
    return account;
  } catch (e) {
    console.error('COULD NOT CREATE ACCOUNT', e);
    return 'Create wallet failed.';
  }
}

export async function setAccount({name, seed}: TAccount) {
  const account: TAccount = {
    name: name,
    seed: seed,
  };
  // await Keychain.setGenericPassword(name, JSON.stringify(account), {service: name})
  await setItem(name, JSON.stringify(account));
}

function generateSeed() {
  const seed = randomBytes(32).toString('hex');
  return seed;
}

function getNmemonicFromSeed(seed: string) {
  return bip39.entropyToMnemonic(seed);
}