import { useCallback, useEffect, useState } from "react"
import * as keychain from "../util/keychain"

export const useKeysExist = () => {
  const [nostr, setNostr] = useState<boolean>(false)
  const [lightning, setLightning] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const checkKeys = async () => {
    const nostrKeys = await keychain.getNostrKeys()
    const lightningKeys = await keychain.getLightningKeys()

    if (nostrKeys) setNostr(true)
    if (lightningKeys) setLightning(true)

    return setLoading(false)
  }
  useEffect(() => {
    checkKeys()
  }, [])
  return { nostr, lightning, loading }
}