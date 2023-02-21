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

import { TVout } from "@synonymdev/react-native-ldk";

export type ElectrsTransactionData = {
  txid: string;
  version: number;
  locktime: number;
  vin: ElectrsVin[];
  vout: ElectrsVout[];
  size: number;
  weight: number;
  fee: number;
  status: ElectrsTxStatus;
};

export type ElectrsVin = {
  txid: string;
  vout: number;
  prevout: {
    scriptpubkey: string;
    scriptpubkey_asm: string;
    scriptpubkey_type: string;
    scriptpubkey_address: string;
    value: number;
  };
  scriptsig: string;
  scriptsig_asm: string;
  witness: string[]
  is_coinbase: boolean;
  sequence: number;
};

export type ElectrsVout = {
  scriptpubkey: string,
  scriptpubkey_asm: string,
  scriptpubkey_type: string,
  scriptpubkey_address: string,
  value: number
}

export type ElectrsTxStatus = {
  confirmed: boolean,
  block_height: number,
  block_hash: string,
  block_time: number,
}

export type ElectrsTxPosition = {
	block_height: number,
	merkle: string[],
	pos: number
}

export const convertElectrsVoutToLdkVout = (electrs:ElectrsVout[]): TVout[] => {
  let voutArray: TVout[] = []
  electrs.map(vout => {
    const ldkVout: TVout = {
      hex: vout.scriptpubkey,
      // TODO: what is n?
      n: 0,
      value: vout.value
    } 
    voutArray.push(ldkVout)
  })
  return voutArray
}