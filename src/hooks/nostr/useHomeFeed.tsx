import {useFollowing} from './useFollowing';
import {useEffect, useState} from 'react';
import {useSubscribe} from '../../nostr';
import {relayUrls} from '../../util/config';
import {Kind, nip19} from 'nostr-tools';
import {Metadata} from '../../types/nostr';

/**
 * Retrieves the cached following for the user and then fetches events from those pubkeys.
 *
 * @returns users feed from who they are following
 */
export const useHomeFeed = () => {
  const following = useFollowing();
  const [profiles, setProfiles] = useState<Metadata[]>(null);

  const {events: rawProfiles, eose: profilesEnded} = useSubscribe({
    relays: relayUrls,
    filters: [
      {
        since: 1686542688,
        kinds: [Kind.Metadata],
        authors: following,
      },
    ],
    options: {
      enabled: !!following,
    },
  });

  useEffect(() => {
    if (!profilesEnded) {
      return;
    }
    const formattedProfiles: Metadata[] = [];
    console.log('rawProfiles', rawProfiles.length, following.length);
    rawProfiles.forEach(profile => {
      const content = JSON.parse(profile.content);
      const metadata: Metadata = {
        name: content?.name,
        username: content?.username,
        display_name: content?.display_name,
        picture: content?.picture,
        banner: content?.banner,
        about: content?.about,
        website: content?.website,
        lud06: content?.lud06,
        lud16: content?.lud16,
        nip05: nip19.npubEncode(profile?.pubkey),
        pubkey: profile?.pubkey,
      };
      formattedProfiles.push(metadata);
      setProfiles(formattedProfiles);
    });
  }, [profilesEnded]);

  // const now = useRef(new Date().getUTCDate() / 1000 - ONE_WEEK_AGO)
  const {events: feed, eose: feedEnded} = useSubscribe({
    relays: relayUrls,
    filters: [
      {
        since: 1686542688,
        kinds: [1],
        authors: following,
      },
    ],
    options: {
      enabled: !!following,
    },
  });

  return {feed, feedEnded, profiles};
};
