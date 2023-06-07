import { useCallback, useEffect, useState } from "react"
import { log } from "../../util/logger"
import { Event, Kind, nip19 } from "nostr-tools"
import { getItem, setItem, storage } from "../../util/storage"
import { npubToHex, Metadata, useNostrEvents } from "../../nostr"

export const useCachedProfile = (pubkey: string) => {
  const [profile, setProfile] = useState<Metadata>(null)
  const [enable, setEnable] = useState<boolean>(false)
  const storageKey = "nostr-profiles"
  const pk = pubkey.startsWith("npub") ? npubToHex(pubkey) : pubkey

  useEffect(() => {
    getProfileFromStorage()
  }, [])

  const getProfileFromStorage = useCallback(() => {
    log.nostr(`getProfileFromStorage: Reading ${pk}`)
    const profiles = JSON.parse(storage.getString(storageKey))
    log.nostr(`Profiles in storage ${profiles.length} ${profiles}`)

    if (!profiles || profiles.length === 0) {
      log.nostr("Nothing in storage.")
      return setEnable(true)
    }
    
    const pubkey = profiles.find(profile => profile.pubkey === pk)

    if (!pubkey) {
      return setEnable(true)
    }

    log.nostr(`getProfileFromStorage: result ${pubkey}`)
    return setProfile(pubkey)
  }, [])

  const event = useNostrEvents({
    filter: {
      since: 1,
      kinds: [Kind.Metadata],
      authors: [pubkey]
    },
    enabled: enable
  })

  event.onEvent(async (event) => {
    log.nostr(`Retrieved profile: ${event.pubkey}`)
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
      nip05: content.nip05,
      pubkey: event.pubkey
    }
    const cachedProfiles = JSON.parse(storage.getString(storageKey))
    const pubkey = cachedProfiles.find(profile => profile.pubkey === metadata.pubkey)
    if (!pubkey || pubkey === undefined) storage.set(storageKey, JSON.stringify([...cachedProfiles, metadata]))
    return setProfile(metadata)
  })

  return { profile }
}