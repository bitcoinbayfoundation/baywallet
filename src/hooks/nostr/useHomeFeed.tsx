import { useFollowing } from "./useFollowing"
import { useEffect, useState } from "react"
import { useSubscribe } from "../../nostr"
import { relayUrls } from "../../util/config"
import { Kind, nip19 } from "nostr-tools"
import { Metadata } from "../../types/nostr"

/**
 * Retrieves the cached following for the user and then fetches events from those pubkeys.
 * 
 * @returns users feed from who they are following
 */
export const useHomeFeed = () => {
  const following = useFollowing()

  // const now = useRef(new Date().getUTCDate() / 1000 - ONE_WEEK_AGO)
  const { events: feed, eose: feedEnded } = useSubscribe({
    relays: relayUrls,
    filters: [{
      since: 1686542688,
      kinds: [1],
      authors: following
    }],
    options: {
      enabled: !!following,
    }
  })

  return { feed, feedEnded }
}