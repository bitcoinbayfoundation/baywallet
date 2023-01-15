import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
// import {
// 	getBlockHashFromHeight,
// 	getBlockHeader,
// 	getBlockHex,
// 	getScriptPubKeyHistory,
// } from '../electrum';
import lm, {
	DefaultTransactionDataShape,
	ENetworks,
	TAccount,
	TAccountBackup,
	TAvailableNetworks,
	THeader,
	TTransactionData,
	TTransactionPosition,
} from '@synonymdev/react-native-ldk';
import ldk from '@synonymdev/react-native-ldk/dist/ldk';
// import {
// 	getAccount,
// 	getAddress,
// 	getNetwork,
// 	ldkNetwork,
// 	setAccount,
// } from '../utils/helpers';
// import { EAccount } from '../utils/types';
import * as bitcoin from 'bitcoinjs-lib';
import { selectedNetwork } from '@config';
import { getBlockHashAtHeight, getBestBlock, getTransactionData } from '../blocks/electrs';
import { getAccount } from '../accounts';

export const setupLdk = async () => {
	try {
		await ldk.reset()
		const genesisHash = await getBlockHashAtHeight(1)
		const account = await getAccount()
		await lm.setBaseStoragePath(`${RNFS.DocumentDirectoryPath}/baywallet/`)

		// const bayWalletStart = lm.start({
		// 	account,
		// 	genesisHash: genesisHash,
		// 	getBestBlock,
		// 	getTransactionData,
		// 	/*getTransactionPosition,*/
		// 	getAddress,
		// 	/*getScriptPubKeyHistory,*/
		// 	/*broadcastTransaction*/
		// 	network: ldkNetwork(selectedNetwork),
		// })
	} catch (e) {
		console.error("FAILED TO SET UP LDK", e)
	}
}

export const ldkNetwork = (network: TAvailableNetworks): ENetworks => {
	switch (network) {
		case 'bitcoinRegtest':
			return ENetworks.regtest;
		case 'bitcoinTestnet':
			return ENetworks.testnet;
		case 'bitcoin':
			return ENetworks.mainnet;
	}
};

export const getNetwork = (
	network: TAvailableNetworks,
): bitcoin.networks.Network => {
	switch (network) {
		case 'bitcoin':
			return bitcoin.networks.bitcoin;
		case 'bitcoinTestnet':
			return bitcoin.networks.testnet;
		case 'bitcoinRegtest':
			return bitcoin.networks.regtest;
		default:
			return bitcoin.networks.regtest;
	}
};