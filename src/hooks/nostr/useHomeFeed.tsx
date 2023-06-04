import { useFollowing } from "./useFollowing"
import { useEffect, useState } from "react"
import { useNostrEvents } from "../../nostr"
import { Kind } from "nostr-tools"
import { log } from "../../util/logger"

/**
 * Retrieves the cached following for the user and then fetches events from those pubkeys.
 * 
 * @returns users feed from who they are following
 */
export const useHomeFeed = () => {
  const { following } = useFollowing()
  const [enable, setEnable] = useState<boolean>(false)
  
  useEffect(() => {
    if (following === null) return
    log.nostr("Getting home feed")
    setEnable(true)
  }, [following])

  const {events: feed} = useNostrEvents({
    filter: {
      since: 1,
      kinds: [Kind.Text],
      authors: following
    },
    enabled: enable
  })

  return { feed }
}