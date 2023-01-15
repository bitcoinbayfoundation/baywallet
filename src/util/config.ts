import { ENetworks, TAvailableNetworks } from "@synonymdev/react-native-ldk";
import * as bitcoin from "bitcoinjs-lib"

export const selectedNetwork: TAvailableNetworks = 'bitcoinRegtest'

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

//Electrum Server Info (Synonym Regtest Set By Default)
export const customPeers = {
	bitcoin: [],
	bitcoinTestnet: [],
	bitcoinRegtest: [
		{
			host: '35.233.47.252',
			ssl: 18484,
			tcp: 18483,
			protocol: 'tcp',
		},
	],
};