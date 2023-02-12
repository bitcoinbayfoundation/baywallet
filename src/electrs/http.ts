import axios from "axios"
import { getItem, setItem } from "../storage"
import { THeader, TTransactionData, TVout } from "@synonymdev/react-native-ldk"
import { convertElectrsVoutToLdkVout, ElectrsTransactionData, ElectrsTxPosition } from "../types/electrs"
import { getAddressFromScriptPubKey, getScriptHash } from "../ldk/wallet"

const apiUrl = "http://localhost:30000"
export const getApiUrl = (path:string): string => {
	return apiUrl + path
}
/**
 * Retrieves the latest block hex from electrum
 * 
 * @returns block hex
 */
export const getLatestBlockHash = async (): Promise<string> => {
  const hex = await axios.get(getApiUrl("/blocks/tip/hash"))
  return hex.data
}
/**
 * Retrieves the latest block number from electrum
 *   
 * @returns latest block number
 */
export const getTipHeight = async (): Promise<number> => {
  const tip = await axios.get(getApiUrl("/blocks/tip/height"))
  console.log("tip", tip.data)
  return Number(tip.data)
}

/**
 * Returns the hash at a given block height.
 * 
 * @param height Bitcoin height
 * @returns 
 */
export const getBlockHashFromHeight = async(height:number): Promise<string> => {
  const hash = await axios.get(`https://mempool.space/api/block-height/${height}`)
  return hash.data
}
/**
 * Retrieves the hex, tip, and header from electrum
 * Converts it to the LDK type and stores it to local storage for later retrieval
 * 
 * @returns {THeader} header information for LDK
 */
export const getLatestBlockHeader = async (): Promise<THeader | string> => {
  const blockHash = await getLatestBlockHash()
  const tipHeight = await getTipHeight()
  const blockHex = await axios.get(getApiUrl(`/block/${blockHash}/header`))
  const headerItem: THeader = {
    hex: blockHex.data,
    hash: blockHash,
    height: tipHeight
  }
  console.log("RETRIEVED HEADER INFO", headerItem)
  const headerStorage = await updateHeader(JSON.stringify(headerItem))
  if (!headerStorage) return "Doh! Did not save latest block header."
  return headerItem
}
/**
 * Retrieves the best block hex from local storage.
 * 
 * @returns Retrieves the block header in local storage.
 */
export const getBestBlock = async (): Promise<THeader> => {
  const block = await getItem<string>("header")
  return block ? JSON.parse(block) : { height: 0, hex: '', hash: '' }
}
/**
 * Update best block header in storage
 * 
 * @param header Header hex to save to local storage
 * @returns true if it stored correctly
 */
export const updateHeader = async (header:string): Promise<boolean> => {
  const result = await setItem("header", header)
  return result
}

export const getTransactionData = async (transactionId:string) => {
  const electrsResponse = await axios.get<ElectrsTransactionData>(getApiUrl(`/tx/${transactionId}`))
  const ldkVout: TVout[] = convertElectrsVoutToLdkVout(electrsResponse.data.vout)
  const transactionData: TTransactionData = {
    header: electrsResponse.data.status.block_hash,
    height: electrsResponse.data.status.block_height,
    transaction: electrsResponse.data.txid,
    vout: ldkVout
  }
  return transactionData
}

export const getTransactionPosition = async ({tx_hash, height}) => {
  const position = await axios.get<ElectrsTxPosition>(getApiUrl(`/tx/${tx_hash}/merkleblock-proof`))
  return position.data.pos
}

export const getScriptPubKeyHistory = async (scriptPubkey: string) => {
  const address = getAddressFromScriptPubKey(scriptPubkey)
  const scriptHash = getScriptHash(address)
  const scriptHashHistory = await axios.get<ElectrsTransactionData[]>(getApiUrl(`/scripthash/${scriptHash}/txs`))
  let history: {txid: string, height: number}[] = []

  scriptHashHistory.data.map(result => {
    history.push({
      txid: result.txid,
      height: result.status.block_height
    })
  })
  return history
}

export const broadcastTransaction = async (rawTx:string) => {
  const broadcastedTx = await axios.post(getApiUrl("/tx"), rawTx)
  return broadcastedTx.data
}