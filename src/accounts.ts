import { ENetworks, TAccount } from '@synonymdev/react-native-ldk';
import { getItem, setItem } from './storage';
import { randomBytes } from "react-native-randombytes"
import * as bip39 from "bip39"
import * as bip32 from "bip32"
import * as bitcoin from "bitcoinjs-lib"
import { getNetwork } from './ldk';
import { selectedNetwork } from './util/config';

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

export const getAccount = async (name: string = "bay-wallet-0"): Promise<TAccount> => {
  console.log("getting account ", name)
    const item = await getItem(name).catch(e => console.log("COULD NOT GET ACCOUNT", e))
    return item
}

const generateSeed = async () => {
  const seed = randomBytes(32).toString("hex")
  return seed
}

const getNmemonicFromSeed = (seed:string) => {
  return bip39.entropyToMnemonic(seed)
}

export const getAddress = async () => {
  const network = getNetwork(selectedNetwork)

  const account = await getAccount()
  const mnemonic = getNmemonicFromSeed(account.seed)
  const mnemonicSeed = await bip39.mnemonicToSeed(mnemonic)
  const root = bip32.fromSeed(mnemonicSeed, network)
  const keyPair = root.derivePath("m/84'/1'/0'/0/0");
	return (
		bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network }).address ??
		''
	);
}

// /**
//  * Get address for a given scriptPubKey.
//  * @param scriptPubKey
//  * @returns {string}
//  */
export const getAddressFromScriptPubKey = (scriptPubKey: string): string => {
	return bitcoin.address.fromOutputScript(
		Buffer.from(scriptPubKey, 'hex'),
		getNetwork(selectedNetwork),
	);
};

// /**
//  * Get scriptHash for a given address
//  * @param {string} address
//  * @returns {string}
//  */
export const getScriptHash = (address: string): string => {
	try {
		const _network = getNetwork(selectedNetwork);
		const script = bitcoin.address.toOutputScript(address, _network);
		let hash = bitcoin.crypto.sha256(script);
		// const reversedHash = new Buffer(hash.reverse());
		// return reversedHash.toString('hex');
    return ""
	} catch (e) {
		console.log(e);
		return '';
	}
};