import { useCallback, useEffect, useState } from "react"
import { log } from "../../util/logger"
import { Event, Kind, nip19 } from "nostr-tools"
import { getItem, setItem } from "../../util/storage"
import { useSubscribe } from "../../nostr"
import { Metadata } from "../../types/nostr"
import { npubToHex } from "../../nostr/utils"
import { relayUrls } from "../../util/config"

export const useCachedProfile = (pubkey: string) => {
  const [profile, setProfile] = useState<Metadata>(null)
  const [enable, setEnable] = useState<boolean>(false)
  const storageKey = "nostr-profiles"
  const pk = pubkey.startsWith("npub") ? npubToHex(pubkey) : pubkey

  useEffect(() => {
    getProfileFromStorage()
  }, [])

  const getProfileFromStorage = useCallback(async () => {
    log.nostr(`getProfileFromStorage: Reading ${pk}`)
    const fs = await getItem(storageKey)
    if (fs === undefined || !fs) {
      await setItem(storageKey, JSON.stringify([]))
      return setEnable(true)
    }
    const profiles: Metadata[] = JSON.parse(await getItem(fs))

    if (!profiles || profiles.length === 0) {
      log.nostr("Nothing in storage.")
      return setEnable(true)
    }

    const pubkey = profiles.find(profile => profile.pubkey === pk)

    if (pubkey === undefined) {
      log.nostr(`Nothing found in storage. Calling to relay for metadata. `)
      return setEnable(true)
    }

    log.nostr(`getProfileFromStorage: ${pubkey}`)
    return setProfile(pubkey)
  }, [])

  const storeProfile = async (event: Event) => {
    const content = JSON.parse(event.content)
    const metadata: Metadata = {
      name: content.name,
      username: content.username,
      display_name: content.display_name,
      picture: content.picture,
      banner: content.banner,
      about: content.about,
      website: content.website,
      lud06: content.lud06,
      lud16: content.lud16,
      nip05: nip19.npubEncode(event.pubkey),
      pubkey: event.pubkey,
    }
    const profilesInStorage: Metadata[] = JSON.parse(await getItem(storageKey))
    const found = profilesInStorage.find(profile => profile.pubkey === event.pubkey)
    if (!found) {
      profilesInStorage.push(metadata)
      await setItem(storageKey, JSON.stringify(profilesInStorage))
      return setProfile(metadata)
    }
  }

  const { events, eose } = useSubscribe({
    relays: relayUrls,
    filters: [{
      since: 1,
      kinds: [Kind.Metadata],
      authors: [pubkey]
    }],
    options: {
      enabled: enable
    }
  })
  // console.log("events", pubkey)
  // useEffect(() => {
  //   if (!eose) return
  //   events.forEach(event => {
  //     storeProfile(event)
  //   })
  // }, [events])

  return { profile: profile }
}