import { ENetworks, TAddPeerReq, TAvailableNetworks } from "@synonymdev/react-native-ldk";
import * as bitcoin from "bitcoinjs-lib"
import Toast, {BaseToast, ErrorToast} from "react-native-toast-message";

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
			host: '127.0.0.1',
			tcp: 50001,
			protocol: 'tcp',
		},
	],
};

export const lspNodeDev: TAddPeerReq = {
	address: "127.0.0.1",
	port: 9735,
	pubKey: "02cd9665a22b50b7dacdbac9a3254946fc6961982e59842560c51e30774fecd623",
	timeout: 3600
}