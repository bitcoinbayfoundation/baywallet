import { useEffect, useState } from "react"
import { generateSeed, getLightningKeys, seedToMnemonic, storeLightningKeys } from "../util/keychain"


export const useLightningSeed = () => {
  const [seed, setSeed] = useState<string>("")
  const [mnemonic, setMnemonic] = useState<string>("")

  const generateLightningSeed = async () => {
    const seed = await generateSeed()
    setSeed(seed)
    setMnemonic(seedToMnemonic(seed))
    return seed
  }

  const getLightningSeedFromKeychain = async () => {
    const seed = await getLightningKeys()
    if (!seed) return null
    setSeed(seed.seed)
    setMnemonic(seedToMnemonic(seed.seed))
    return seed
  }

  const getKeys = async () => {
    const keychain = await getLightningSeedFromKeychain()
    if (!keychain) {
      await generateLightningSeed()
    }
    return
  }

  const saveKeys = async () => storeLightningKeys({ name: "bay-wallet", seed: seed })

  useEffect(() => {
    getKeys()
  }, [])

  return { seed, mnemonic, saveKeys }
}