import axios from "axios"
import { setItem } from "../storage"

export const getLatestBlockHex = async (): Promise<string> => {
  const tip = await axios.get("https://mempool.space/api/blocks/tip/hash")
  return tip.data
}

export const getBlockHeader = async (): Promise<string> => {
  const blockHex = await getLatestBlockHex()
  const header = await axios.get(`https://mempool.space/api/block/${blockHex}/header`)
  console.log("header", header.data)
  const headerStorage = await updateHeader(header.data)
  if (!headerStorage) return "Doh! Did not save latest block header."
  return header.data
}

export const updateHeader = async (header:string): Promise<boolean> => {
  const result = await setItem("header", header)
  return result
}