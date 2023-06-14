import RNFS from 'react-native-fs';
import lm, {
  ENetworks,
  THeader
} from '@synonymdev/react-native-ldk';
import { log } from '../util/logger';
import ldk from "@synonymdev/react-native-ldk/dist/ldk"
import {getAddress} from '../backend/wallet';
import {err, ok, Result} from '../types/result';
import { getScriptPubKeyHistory, broadcastTransaction, getTransactionPosition, getTransactionData } from '../backend/mempool';
import { getItem, setItem } from '../util/storage';
import { getAccount } from '../util/account';

/**
 * Used to spin-up LDK services.
 * In order, this method:
 * 1. Fetches and sets the genesis hash.
 * 2. Retrieves and sets the seed from storage.
 * 3. Starts ldk with the necessary params.
 * 4. Adds/Connects saved peers from storage. (Note: Not needed as LDK handles this automatically once a peer has been added successfully. Only used to make example app easier to test.)
 * 5. Syncs LDK.
 */
export const startBayWalletNode = async (/*getAccount?: () => Promise<any>*/): Promise<Result<string>> => {
	try {
		await ldk.reset();
		const account = await getAccount();
		const storageRes = await lm.setBaseStoragePath(
			`${RNFS.DocumentDirectoryPath}/ldk/`,
		);
		if (storageRes.isErr()) {
			return err(storageRes.error);
		}
    
		const lmStart = await lm.start({
			account,
			getBestBlock,
			getTransactionData,
			getTransactionPosition,
			getAddress,
			getScriptPubKeyHistory,
      getFees: () =>
				Promise.resolve({
					highPriority: 100,
					normal: 0,
					background: 0,
				}),
			broadcastTransaction,
			network: ENetworks.regtest,
		});

		if (lmStart.isErr()) {
			return err(lmStart.error.message);
		}
		
		const syncRes = await lm.syncLdk();
		if (syncRes.isErr()) {
      log.error(`Error syncing Bay Wallet Node: ${syncRes.error.message}`);
			return err(syncRes.error.message);
		}

		return ok('Running Bay Wallet Node'); //e2e test needs to see this string
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
