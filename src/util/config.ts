import { TAvailableNetworks } from "@synonymdev/react-native-ldk";

export const selectedNetwork: TAvailableNetworks = 'bitcoinRegtest'

export const getApiUrl = (path:string): string => {
  return `http://localhost:30000${path}`
}