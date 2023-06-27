import {useState, useEffect} from 'react';
import {useDataStore} from '../../store';
import {getItem, setItem} from '../../util/storage';
import {log} from '../../util/logger';
import {Kind, Event} from 'nostr-tools';
import {useSubscribe} from '../../nostr';
import {relayUrls} from '../../util/config';

/**
 * Maybe in the future have a pubkey param for viewing others feeds?
 */

export type FollowingCache = {
  created_at: number;
  following: string[];
};

export const useFollowing = () => {
  const {
    keyStore: {nostrKeys},
  } = useDataStore();
  const [callRelay, setCallRelay] = useState<boolean>(false);
  const [following, setFollowing] = useState<string[]>(null);
  const storageKey = `${nostrKeys.pubkey}-following`;

  useEffect(() => {
    getFollowingFromStorage();
  }, []);

  /**
   * Attempts to get following from storage. If not, it will call to fetch following from relays.
   * @returns following from storage or call to relays
   */
  const getFollowingFromStorage = async () => {
    log.nostr(`getFollowingFromStorage: Reading ${storageKey}`);
    const following = await getItem(storageKey);

    if (!following || following === undefined) {
      log.nostr('getFollowingFromStorage: fetching from relays');
      return setCallRelay(true);
    }
    return setFollowing(JSON.parse(following));
  };

  /**
   * TODO: Save the storage w/ {@link FollowingCache} and have a check if the event we got was newer.
   * When we receive an event from a relay:
   * 1: Check if we have it stored already indexed by creation_date
   * 2: If the event is newer, we update the storage
   *
   * @param event from relay
   */
  const storeFollowing = async (event: Event) => {
    const saved = await getItem(storageKey);
    if (!saved) {
      const arrayOfFollowing = [];
      if (event.tags.length === 0) {
        return;
      }
      event.tags.forEach(tag => {
        arrayOfFollowing.push(tag[1]);
      });
      await setItem(storageKey, JSON.stringify(arrayOfFollowing));
      return setFollowing(arrayOfFollowing);
    }
  };

  const {events, eose} = useSubscribe({
    relays: relayUrls,
    filters: [
      {
        since: 1,
        kinds: [Kind.Contacts],
        authors: [nostrKeys.pubkey],
      },
    ],
    options: {
      enabled: callRelay,
    },
  });

  useEffect(() => {
    if (!eose) {
      return;
    }
    const arrayOfFollowing = [];
    if (events[0].tags.length === 0) {
      return;
    }
    events[0].tags.forEach(tag => {
      arrayOfFollowing.push(tag[1]);
    });
    storeFollowing(events[0]);
  }, [eose]);

  return following;
};
