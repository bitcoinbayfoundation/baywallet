import mempoolJS from '@mempool/mempool.js';
import { Vout } from '@mempool/mempool.js/lib/interfaces/bitcoin/transactions';
import {
	TTransactionData,
	TTransactionPosition,
	TVout,
} from '@synonymdev/react-native-ldk';
import { getAddressFromScriptPubKey, getScriptHash } from './wallet';
import { mempoolHostname } from '../util/config';
import { EsploraMerkleProof, TGetAddressHistory } from './types';
import axios from 'axios';

const { bitcoin: { blocks, transactions, addresses }} = mempoolJS({
	hostname: mempoolHostname,
	network: 'regtest',
});

export const getTransactionData = async (
	transactionId: string,
): Promise<TTransactionData> => {
	console.log("trying here for transacion data",transactionId)
	const transaction = await transactions.getTx({ txid: transactionId });
	const ldkVout: TVout[] = convertElectrsVoutToLdkVout(transaction.vout);

	const blockHeader = await blocks.getBlockHeader({
		hash: transaction.status.block_hash,
	});
	const transactionData: TTransactionData = {
		header: blockHeader,
		height: transaction.status.block_height,
		transaction: transactionId,
		vout: ldkVout,
	};

	return transactionData;
};

export const convertElectrsVoutToLdkVout = (mempoolTxn: Vout[]): TVout[] => {
	let voutArray: TVout[] = [];
	mempoolTxn.map((vout) => {
		const ldkVout: TVout = {
			hex: vout.scriptpubkey,
			n: mempoolTxn.indexOf(vout),
			value: vout.value,
		};
		voutArray.push(ldkVout);
	});
	return voutArray;
};

/**
 * FIX ME!
 * This is a hot fix until i can figure out mempool api connecting to esplora
 * until then, call espolora api directly
 * 
 * @param param0 
 * @returns 
 */
export const getTransactionPosition = async ({
	tx_hash,
	height,
}): Promise<TTransactionPosition> => {
	console.log("trying here for transacion position", tx_hash, height)
	const txMerkleProof = await axios.get<EsploraMerkleProof>(`http://64.225.50.85:3003/tx/${tx_hash}/merkle-proof`)
	console.log("txMerkleProof", txMerkleProof.status, txMerkleProof.data)
	return txMerkleProof.data.pos;
	// const merkleProof = await transactions.getTxMerkleProof({ txid: tx_hash });
	// const txMerkleProof = merkleProof.find(
	// 	(proof) => proof.block_height === height,
	// );
	// if (!txMerkleProof) {
	// 	return -1;
	// }
};

export const getScriptPubKeyHistory = async (
	scriptPubkey: string,
): Promise<TGetAddressHistory[]> => {
	console.log("trying here for address info", scriptPubkey)
	const address = getAddressFromScriptPubKey(scriptPubkey);
	const scriptHash = getScriptHash(address);
	const scriptHashHistory = await addresses.getAddressTxs({
		address: scriptHash,
	});

	let history: { txid: string; height: number }[] = [];

	scriptHashHistory.map((result) => {
		history.push({
			txid: result.txid,
			height: result.status.block_height,
		});
	});
	return history;
};

/**
 * Returns the balance in sats of the provided Bitcoin address.
 * @param {string} [address]
 * @returns {Promise<number>}
 */
export const getAddressBalance = async (address = ''): Promise<number> => {
	try {
		const addressBalance = await addresses.getAddress({ address: address });
		return (
			addressBalance.chain_stats.funded_txo_sum -
			addressBalance.chain_stats.spent_txo_sum
		);
	} catch {
		return 0;
	}
};

export const broadcastTransaction = async (rawTx: string) => {
	try {
		const transaction = await transactions.postTx({ txhex: rawTx });
		return transaction;
	} catch (e) {
		console.log('Error broadcasting transaction', e);
		return '';
	}
};
