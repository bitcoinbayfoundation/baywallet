import { THeader } from "@synonymdev/react-native-ldk"
import axios from "axios"
import { setItem } from "../storage"

/**
 * Retrieves the latest block hex from mempool.space
 * 
 * @returns block hex
 */
export const getLatestBlockHex = async (): Promise<string> => {
  const hex = await axios.get("https://mempool.space/api/blocks/tip/hash")
  return hex.data
}

/**
 * Retrieves the latest block number from mempool.space
 *  
 * @returns latest block number
 */
export const getTipHeight = async (): Promise<number> => {
  const tip = await axios.get("https://mempool.space/api/blocks/tip/height")
  return Number(tip.data)
}

/**
 * Retrieves the hex, tip, and header from mempool.space
 * Converts it to the LDK type and stores it to local storage for later retrieval
 * 
 * @returns {THeader} header information for LDK
 */
export const getBlockHeader = async (): Promise<THeader | string> => {
  const blockHex = await getLatestBlockHex()
  const tipHeight = await getTipHeight()
  const header = await axios.get(`https://mempool.space/api/block/${blockHex}/header`)

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

export const updateHeader = async (header:string): Promise<boolean> => {
  const result = await setItem("header", header)
  return result
}