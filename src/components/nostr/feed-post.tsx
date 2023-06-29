import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { View, Avatar, Text, Colors } from 'react-native-ui-lib';
import { Metadata } from '../../types/nostr';
import { Event } from 'nostr-tools';
import { TextWithClamp } from '../text-with-clamp';
import { Engage } from './engagement/engage';
import axios from 'axios';

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
      const rawContent = JSON.parse(profile.data.content);
      const metadata: Metadata = {
        name: rawContent.name,
        username: rawContent.username,
        picture: rawContent.picture,
        banner: rawContent.banner,
        about: rawContent.about,
        nip05: rawContent.nip05,
      };
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
        <Pressable onPress={() => null}>
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
