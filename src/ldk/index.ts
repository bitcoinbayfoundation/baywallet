import RNFS from 'react-native-fs';
import * as electrum from 'rn-electrum-client/helpers';
import lm, {
  DefaultTransactionDataShape,
  ENetworks,
  TTransactionData,
  TTransactionPosition,
} from '@synonymdev/react-native-ldk';
import ldk from '@synonymdev/react-native-ldk/dist/ldk';
import {getAddress} from '../ldk/wallet';
import {err, Result} from '../types/result';
import { ldkNetwork} from '../util/config';
import stores from '../store';
import { getBestBlock, getBlockHashFromHeight, getScriptPubKeyHistory, getTransactionData, getTransactionPosition, broadcastTransaction, getLatestBlockHeader, updateHeader } from '../electrs/http';

export const setupLdk = async () => {
  const {getAccount} = stores.accountStore
  try {
    const genesisHash = await getBlockHashFromHeight(0);
    const headerInfo = await getLatestBlockHeader()
    const account = await getAccount();
    console.log('ACCOUNT', account);
    await lm.setBaseStoragePath(`${RNFS.DocumentDirectoryPath}/baywallet/`);
    // Subscribe to new blocks and sync LDK accordingly.
    // const headerInfo = await subscribeToHeader({
    //   onReceive: async (): Promise<void> => {
    //     const syncRes = await syncLdk();
    //     if (syncRes.isErr()) {
    //       return;
    //     }
    //   },
    // });
    // if (headerInfo.isErr()) {
    //   return;
    // }
    await updateHeader(JSON.stringify(headerInfo));

    const lmStart = await lm.start({
      account,
      genesisHash: genesisHash,
      getBestBlock,
      getAddress,
      getScriptPubKeyHistory,
      getTransactionData,
      getTransactionPosition,
      broadcastTransaction,
      network: ENetworks.regtest,
    });

    if (lmStart.isErr()) {
      return err(`ERROR STARTING: ${lmStart.error.message}`);
    }
    
  } catch (e) {
    console.error('FAILED TO SET UP LDK', e);
  }
};

/**
 * Syncs LDK to the current height.
 * @returns {Promise<Result<string>>}
 */
export const syncLdk = async (): Promise<Result<string>> => {
  const syncResponse = await lm.syncLdk();
  return syncResponse;
};

/**
 * Returns the transaction header, height and hex (transaction) for a given txid.
 * @param {string} txId
 * @returns {Promise<TTransactionData>}
 */
// export const getTransactionData = async (
//   txId: string = '',
// ): Promise<TTransactionData> => {
//   let transactionData = DefaultTransactionDataShape;
//   const data = {
//     key: 'tx_hash',
//     data: [
//       {
//         tx_hash: txId,
//       },
//     ],
//   };
//   const response = await electrum.getTransactions({
//     txHashes: data,
//     network: "bitcoinRegtest",
//   });

//   if (response.error || !response.data || response.data[0].error) {
//     return transactionData;
//   }
//   const {confirmations, hex: hex_encoded_tx, vout} = response.data[0].result;
//   const header = await getBestBlock();
//   const currentHeight = header.height;
//   let confirmedHeight = 0;
//   if (confirmations) {
//     confirmedHeight = currentHeight - confirmations + 1;
//   }
//   const hexEncodedHeader = await getBlockHex({
//     height: confirmedHeight,
//   });
//   if (hexEncodedHeader.isErr()) {
//     return transactionData;
//   }
//   const voutData = vout.map(({n, value, scriptPubKey: {hex}}) => {
//     return {n, hex, value};
//   });
//   return {
//     header: hexEncodedHeader.value,
//     height: confirmedHeight,
//     transaction: hex_encoded_tx,
//     vout: voutData,
//   };
// };

/**
 * Returns the position/index of the provided tx_hash within a block.
 * @param {string} tx_hash
 * @param {number} height
 * @returns {Promise<number>}
 */
// export const getTransactionPosition = async ({
//   tx_hash,
//   height,
// }): Promise<TTransactionPosition> => {
//   const response = await electrum.getTransactionMerkle({
//     tx_hash,
//     height,
//     network: "bitcoinRegtest",
//   });
//   if (response.error || isNaN(response.data?.pos || response.data?.pos < 0)) {
//     return -1;
//   }
//   return response.data.pos;
// };

/**
 * Attempts to broadcast the provided rawTx.
 * @param {string} rawTx
 * @returns {Promise<string>}
 */
// export const broadcastTransaction = async (rawTx: string): Promise<string> => {
//   try {
//     const response = await electrum.broadcastTransaction({
//       rawTx,
//       network: "bitcoinRegtest",
//     });
//     console.log('broadcastTransaction', response);
//     return response.data;
//   } catch (e) {
//     console.log(e);
//     return '';
//   }
// };
