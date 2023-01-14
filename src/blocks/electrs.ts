import { THeader } from "@synonymdev/react-native-ldk"
import axios from "axios"
import { getItem, setItem } from "../storage"
import { getApiUrl } from "../util/config"

/**
 * Retrieves the latest block hex from electrum
 * 
 * @returns block hex
 */
export const getLatestBlockHex = async (): Promise<string> => {
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
  return Number(tip.data)
}

export const getBlockHashAtHeight = async(height:number): Promise<string> => {
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
  const blockHex = await getLatestBlockHex()
  const tipHeight = await getTipHeight()
  const header = await axios.get(getApiUrl(`/block/${blockHex}/header`))

  const headerItem: THeader = {
    hex: blockHex,
    hash: header.data,
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
  const block = await getItem("header").catch(e => console.error("NO BEST BLOCK IN STORAGE", e))
  return block
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