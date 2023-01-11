import { TAccount, THeader } from "@synonymdev/react-native-ldk"
import { getItem, setItem } from "../storage"

export const setWallet = async ({name, seed}: TAccount) => {
  const account: TAccount = {
    name: name,
    seed: seed
  }
  console.log(account)
  // await Keychain.setGenericPassword(name, JSON.stringify(account), {service: name})
  await setItem(account.name, account.seed)

}
export const createNewWallet = async () => {
  try {

    const accountName = "bay-wallet-0"
    const account: TAccount = {
      name: accountName,
      seed: generateSeed()
    }
    
    await setWallet(account)
  } catch (e) {
    console.error("create wallet", e)
  }
}

const generateSeed = () => {
  return "C43D4437B3CDF8FB1F6509AF7B6FEC10"
}

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