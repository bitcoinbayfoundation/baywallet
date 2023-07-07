import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Pressable } from 'react-native';
import { View, Avatar, Text, Colors } from 'react-native-ui-lib';
import { Metadata } from '../../types/nostr';
import { Event } from 'nostr-tools';
import { TextWithClamp } from '../misc/text-with-clamp';
import { Engage } from './engagement/engage';
import { parseMetadata } from '../../util/nostr';

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

  return (
    <>
      <View width="95%" backgroundColor={Colors.screenBG} style={styles.post}>
        <View right>
          <Pressable onPress={() => console.log('share')}>
            <Text>•••</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => navigation.navigate("nostr-post", { event: event, profile: metadata })}>
          <TextWithClamp
            ui={{ text70: true }}
            numberOfLines={clamp ? 10 : undefined}>
            {event.content}
          </TextWithClamp>
        </Pressable>
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
