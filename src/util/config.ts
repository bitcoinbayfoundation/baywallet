import { TAvailableNetworks } from "@synonymdev/react-native-ldk";

export const selectedNetwork: TAvailableNetworks = 'bitcoinRegtest'

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