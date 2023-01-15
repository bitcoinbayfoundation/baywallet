import { TAvailableNetworks } from '@synonymdev/react-native-ldk';

export enum Account {
	name = 'bay-wallet-0',
	currentAccountKey = 'current-account',
}

export interface IGetHeaderResponse {
	id: Number;
	error: boolean;
	method: 'getHeader';
	data: string;
	network: TAvailableNetworks;
}

export interface ISubscribeToHeader {
	data: {
		height: number;
		hex: string;
	};
	error: boolean;
	id: string;
	method: string;
}

export type TGetAddressHistory = { txid: string; height: number };