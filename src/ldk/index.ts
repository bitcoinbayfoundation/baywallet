import RNFS from 'react-native-fs';
import lm, {
  DefaultTransactionDataShape,
  ELdkLogLevels,
  ENetworks,
  THeader,
  TTransactionData,
  TTransactionPosition,
} from '@synonymdev/react-native-ldk';
import ldk from "@synonymdev/react-native-ldk/dist/ldk"
import {getAddress} from '../ldk/wallet';
import {err, ok, Result} from '../types/result';
import { getBlockHashFromHeight, getBlockHex, getScriptPubKeyHistory } from '../electrs/electrs';
import * as electrum from "rn-electrum-client/helpers"
import { getAccount } from '../util/account';
import { getItem, setItem } from '../storage';

/**
 * Used to spin-up LDK services.
 * In order, this method:
 * 1. Fetches and sets the genesis hash.
 * 2. Retrieves and sets the seed from storage.
 * 3. Starts ldk with the necessary params.
 * 4. Adds/Connects saved peers from storage. (Note: Not needed as LDK handles this automatically once a peer has been added successfully. Only used to make example app easier to test.)
 * 5. Syncs LDK.
 */
export const setupLdk = async (): Promise<Result<string>> => {
	try {
		await ldk.reset();
		const genesisHash = await getBlockHashFromHeight({height:0});
		if (genesisHash.isErr()) {
			return err(genesisHash.error.message);
		}
		const account = await getAccount();
		const storageRes = await lm.setBaseStoragePath(
			`${RNFS.DocumentDirectoryPath}/ldk/`,
		);
		if (storageRes.isErr()) {
			return err(storageRes.error);
		}
		const lmStart = await lm.start({
			account,
			genesisHash: genesisHash.value,
			getBestBlock,
			getTransactionData,
			getTransactionPosition,
			getAddress,
			getScriptPubKeyHistory,
      getFees: () =>
				Promise.resolve({
					highPriority: 12500,
					normal: 12500,
					background: 12500,
				}),
			broadcastTransaction,
			network: ENetworks.regtest,
		});

		if (lmStart.isErr()) {
			return err(lmStart.error.message);
		}
		// const syncRes = await lm.syncLdk();
		// if (syncRes.isErr()) {
    //   console.log("sync error", syncRes.error)
		// 	return err(syncRes.error.message);
		// }

		return ok('Running LDK'); //e2e test needs to see this string
	} catch (e) {
		return err(e.toString());
	}
};

/**
 * Syncs LDK to the current height.
 * @returns {Promise<Result<string>>}
 */
export const syncLdk = async (): Promise<Result<string>> => {
  const syncResponse = await lm.syncLdk();
  if (syncResponse.isErr()) {
  } else {console.log("synced", syncResponse.value)}
  
  return syncResponse;
};

/**
 * Saves new/latest header data to local storage.
 * @param {THeader} header
 * @returns {Promise<void>}
 */
export const updateHeader = async ({
	header,
}: {
	header: THeader;
}): Promise<boolean> => {
	return await setItem('header', JSON.stringify(header));
};

/**
 * Returns last known header information from storage.
 * @returns {Promise<THeader>}
 */
export const getBestBlock = async (): Promise<THeader> => {
	const bestBlock = await getItem('header');
	return bestBlock ? JSON.parse(bestBlock) : { height: 0, hex: '', hash: '' };
};

/**
 * Returns the transaction header, height and hex (transaction) for a given txid.
 * @param {string} txId
 * @returns {Promise<TTransactionData>}
 */
export const getTransactionData = async (
  txId: string = '',
): Promise<TTransactionData> => {
  let transactionData = DefaultTransactionDataShape;
  const data = {
    key: 'tx_hash',
    data: [
      {
        tx_hash: txId,
      },
    ],
  };
  const response = await electrum.getTransactions({
    txHashes: data,
    network: "bitcoinRegtest",
  });
  if (response.error || !response.data || response.data[0].error) {
    return transactionData;
  }
  const {confirmations, hex: hex_encoded_tx, vout} = response.data[0].result;
  const header = await getBestBlock();
  const currentHeight = header.height;
  let confirmedHeight = 0;
  if (confirmations) {
    confirmedHeight = currentHeight - confirmations + 1;
  }
  const hexEncodedHeader = await getBlockHex({
    height: confirmedHeight,
  });
  if (hexEncodedHeader.isErr()) {
    return transactionData;
  }
  const voutData = vout.map(({n, value, scriptPubKey: {hex}}) => {
    return {n, hex, value};
  });
  console.log("GOT TRANSACTION DATA", voutData)
  return {
    header: hexEncodedHeader.value,
    height: confirmedHeight,
    transaction: hex_encoded_tx,
    vout: voutData,
  };
};

/**
 * Returns the position/index of the provided tx_hash within a block.
 * @param {string} tx_hash
 * @param {number} height
 * @returns {Promise<number>}
 */
export const getTransactionPosition = async ({
  tx_hash,
  height,
}): Promise<TTransactionPosition> => {
  const response = await electrum.getTransactionMerkle({
    tx_hash,
    height,
    network: "bitcoinRegtest",
  });
  if (response.error || isNaN(response.data?.pos || response.data?.pos < 0)) {
    return -1;
  }
  return response.data.pos;
};

/**
 * Attempts to broadcast the provided rawTx.
 * @param {string} rawTx
 * @returns {Promise<string>}
 */
export const broadcastTransaction = async (rawTx: string): Promise<string> => {
  try {
    const response = await electrum.broadcastTransaction({
      rawTx,
      network: "bitcoinRegtest",
    });
    console.log('broadcastTransaction', response);
    return response.data;
  } catch (e) {
    console.log(e);
    return '';
  }
};
