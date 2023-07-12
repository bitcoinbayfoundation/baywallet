import { getNetwork, selectedNetwork } from "../util/config";
import * as bitcoin from "bitcoinjs-lib"
import * as bip39 from "bip39"
import * as bip32 from "bip32"
import { getLightningKeys } from "../util/keychain";
import { log } from "../util/logger";

export const getAddress = async () => {
  const network = getNetwork(selectedNetwork)
  const account = await getLightningKeys()
  const mnemonic = bip39.entropyToMnemonic(account.seed)
  const mnemonicSeed = await bip39.mnemonicToSeed(mnemonic)
  const root = bip32.fromSeed(mnemonicSeed, network)
  const keyPair = root.derivePath("m/84'/1'/0'/0/0");
	return (
		bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network }).address ??
		''
	);
}

/**
 * Get address for a given scriptPubKey.
 * @param scriptPubKey
 * @returns {string}
 */
export const getAddressFromScriptPubKey = (scriptPubKey: string): string => {
	return bitcoin.address.fromOutputScript(
		Buffer.from(scriptPubKey, 'hex'),
		getNetwork(selectedNetwork),
	);
};

/**
 * Get scriptHash for a given address
 * @param {string} address
 * @returns {string}
 */
export const getScriptHash = (address: string): string => {
	try {
		const _network = getNetwork(selectedNetwork);
		const script = bitcoin.address.toOutputScript(address, _network);
		let hash = bitcoin.crypto.sha256(script);
		const reversedHash = new Buffer(hash.reverse());
		return reversedHash.toString('hex');
	} catch (e) {
		log.keys(e);
		return '';
	}
};