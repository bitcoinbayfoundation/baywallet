import RNFS from 'react-native-fs';
import lm, {
  EEventTypes,
  ENetworks,
  TChannelManagerClaim,
  TChannelUpdate,
  THeader,
} from '@synonymdev/react-native-ldk';
import {log} from '../util/logger';
import ldk from '@synonymdev/react-native-ldk/dist/ldk';
import {getAddress} from '../backend/wallet';
import {err, ok, Result} from '../types/result';
import {
  getScriptPubKeyHistory,
  broadcastTransaction,
  getTransactionPosition,
  getTransactionData,
} from '../backend/mempool';
import {getItem, setItem} from '../util/storage';
import mempool from '@mempool/mempool.js';
import {ldkNetwork, mempoolHostname, selectedNetwork} from '../util/config';
import {EmitterSubscription} from 'react-native';
import Toast from 'react-native-toast-message';
import { getLightningKeys } from '../util/keychain';

let paymentSubscription: EmitterSubscription | undefined;
let onChannelSubscription: EmitterSubscription | undefined;
// let onSpendableOutputsSubscription: EmitterSubscription | undefined;
let logSubscription: EmitterSubscription | undefined;

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
		const account = await getLightningKeys();
		const storageRes = await lm.setBaseStoragePath(
			`${RNFS.DocumentDirectoryPath}/ldk/`,
		);
		if (storageRes.isErr()) {
			return err(storageRes.error);
		}

    const bestBlock = mempool({
      hostname: mempoolHostname,
    });

    const tip = await bestBlock.bitcoin.blocks.getBlocksTipHeight();
    const hash = await bestBlock.bitcoin.blocks.getBlocksTipHash();
    const hex = await bestBlock.bitcoin.blocks.getBlockHeader({hash: hash});
    await updateHeader({header: {height: tip, hex: hex, hash: hash}});

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
      network: ldkNetwork(selectedNetwork),
    });

    if (lmStart.isErr()) {
      return err(lmStart.error.message);
    }

    const syncRes = await lm.syncLdk();
    if (syncRes.isErr()) {
      log.error(`Error syncing Bay Wallet Node: ${syncRes.error.message}`);
      return err(syncRes.error.message);
    }

    subscribeToBlocks();
    
    await subscribeToTransactions();

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
  } else {
    console.log('synced', syncResponse.value);
  }

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
  log.ldk(`Best block: ${bestBlock}`);

  const block = bestBlock
    ? JSON.parse(bestBlock)
    : {height: 0, hex: '', hash: ''};
  log.ldk(`Best block: ${JSON.stringify(block)}`);
  return block;
};

export const subscribeToTransactions = async () => {
  if (!logSubscription) {
    // @ts-ignore
    logSubscription = ldk.onEvent(EEventTypes.ldk_log, (ldk: string) =>
      log.ldk(ldk),
    );
  }

  if (!paymentSubscription) {
    // @ts-ignore
    paymentSubscription = ldk.onEvent(
      EEventTypes.channel_manager_payment_claimed,
      (res: TChannelManagerClaim) =>
        Toast.show({
          type: 'success',
          text1: 'New payment!',
          text2: `${res.amount_sat} sats`,
        }),
    );
  }

  if (!onChannelSubscription) {
    // @ts-ignore
    onChannelSubscription = ldk.onEvent(
      EEventTypes.new_channel,
      (res: TChannelUpdate) =>
        Toast.show({
          type: 'success',
          text1: 'New channel!',
          text2: `Channel received from ${res.counterparty_node_id} Channel ${res.channel_id}`,
        }),
    );
  }
  // if (!backupSubscriptionId) {
  // 	backupSubscriptionId = lm.subscribeToBackups((backupRes) => {
  // 		if (backupRes.isErr()) {
  // 			return alert('Backup required but failed to export account');
  // 		}

  // 		log.ldk(
  // 			`Backup updated for account ${backupRes.value.account.name}`,
  // 		);
  // 	});
  // }
};

export const subscribeToBlocks = () => {
  const {
    bitcoin: {websocket},
  } = mempool({
    hostname: mempoolHostname,
  });

  const ws = websocket.initClient({
    options: ['blocks'],
  });

  ws.addEventListener('message', async function incoming({data}) {
    const res = JSON.parse(data);
    const header = {
      hex: res.block.extras.header,
      hash: res.block.id,
      height: res.block.height,
    };
    if (res.block) {
      await updateHeader({header: header});
      lm.syncLdk();
    }
  });
};
