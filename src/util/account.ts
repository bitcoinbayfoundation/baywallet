import { TAccount } from "@synonymdev/react-native-ldk";
import { getItem, setItem } from "../util/storage";
import * as bip39 from "bip39"
import { randomBytes } from "crypto";

enum Account {
  name = 'bay-wallet-3',
  currentAccountKey = 'current-account',
}
export async function setActiveAccount(account: TAccount) {
  const storeAccount = await setItem(Account.currentAccountKey, account.name);
  return storeAccount;
}

export async function getAccount(): Promise<any> {
  const account = await getItem<string>("baywallet-account-test");
  if (account) return JSON.parse(account);
  const newAccount = await createNewAccount("baywallet-account-test");
  return newAccount;
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