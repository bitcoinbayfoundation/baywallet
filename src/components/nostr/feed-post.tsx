import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Pressable, Image } from 'react-native';
import { View, Avatar, Text, Colors } from 'react-native-ui-lib';
import { Metadata } from '../../types/nostr';
import { Event } from 'nostr-tools';
import { TextWithClamp } from '../misc/text-with-clamp';
import { Engage } from './engagement/engage';
import { parseBayWalletPost, parseMetadata } from '../../util/nostr';
import { SmallText } from '../misc';
import { PostLink } from './post-link';

export type PostProps = {
  event: Event;
  navigation: any;
};

export const FeedPost = ({ event, navigation }: PostProps) => {
  const clamp = event.content.length > 100;
  const [metadata, setMetadata] = useState<Metadata>({
    pubkey: '',
    picture: '',
  });

  const bayWalletPost = parseBayWalletPost(event)

  useEffect(() => {
    const getProfile = async () => {
      const profile = await axios.get(
        `https://api.iris.to/profile/${event.pubkey}`,
      );
      const metadata = parseMetadata(profile.data)
      setMetadata(metadata);
    };
    getProfile();
  }, []);

  const body = useMemo(() => {
    if (bayWalletPost.imageUrls.length > 0) {
      return (
        <Image source={{ uri: bayWalletPost.imageUrls[0] }} style={{ width: '100%', height: 200 }} />
      )
    } else {
      return (
        <TextWithClamp
          ui={{ text70: true }}
          numberOfLines={clamp ? 10 : undefined}>
          {bayWalletPost.content}
        </TextWithClamp>
      )
    }
  }, [event])

  return (
    <>
      <View width="95%" backgroundColor={Colors.screenBG} style={styles.post}>
        <View right>
          <Pressable onPress={() => console.log('share')}>
            <Text>•••</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => navigation.navigate("nostr-post", { event: bayWalletPost, profile: metadata })}>
          {body}
        </Pressable>
        {bayWalletPost.links.length > 0 && <PostLink link={bayWalletPost.links[0]} />}
        <View height={10} />
        <View row centerV spread>
          <Engage
            replyFn={() => null}
            repostFn={() => null}
            reactionFn={() => null}
          />
          <Avatar
            size={30}
            source={{ uri: metadata.picture }}
            badgePosition={metadata?.nip05 ? 'TOP_RIGHT' : undefined}
            badgeProps={
              metadata?.nip05
                ? {
                  backgroundColor: '#FFDF01',
                }
                : undefined
            }
            onPress={() => navigation.navigate('nostr-profile', { pubkey: event.pubkey, profile: metadata })}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  post: {
    borderRadius: 10,
    borderColor: Colors.grey10,
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
});
