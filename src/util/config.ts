import { ENetworks, TAddPeerReq, TAvailableNetworks } from "@synonymdev/react-native-ldk";
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
			host: 'host.docker.internal',
			tcp: 50000,
			protocol: 'tcp',
		},
	],
};

export const lndDevNode: TAddPeerReq = {
	address: "127.0.0.1",
	port: 9735,
	pubKey: "02708bc245f5ba8130149ce59281c2f1f7fd7578118cc019384ce21a8ad08eabe2",
	timeout: 3600
}

export const loggerConfig = {
	levels: {
		debug: 0,
		LDK: 0,
		NOSTR: 0
	},
	transportOptions: {
		colors: {
			debug: "yellow",
			LDK: "blue",
			NOSTR: "purple"
		}
	}
}