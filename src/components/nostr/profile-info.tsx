import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Image, View, Text, Icon } from 'react-native-ui-lib';
import { Metadata } from '../../types/nostr';
import { Button } from '../misc/button';

type NostrProfile = {
  profile: Metadata;
};

export const ProfileInfo = ({ profile }: NostrProfile) => {
  return (
    <>
      <Image source={{ uri: profile.banner }} width={'100%'} height={125} />
      <View row right style={styles.action}>
        <Button label="Follow" size='medium' onPress={() => null} />
      </View>
      <View style={styles.avatar}>
        <Avatar size={75} source={{ uri: profile.picture }} />
      </View>
      <View style={styles.content}>
        <View row centerV>
          <Text text60R>{profile.name}</Text>
          {profile.nip05 && (
            <>
              <Icon
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png',
                }}
                size={15}
              />
              <Text style={styles.nip5}>{profile.nip05.split('@')[1]}</Text>
            </>
          )}
        </View>
        <Text style={styles.username}>@{profile.username}</Text>
        <Text text70>{profile.about}</Text>
        <View row style={styles.stats}>
          <Text>{45} Following</Text>
          <Text>{64} Followers</Text>
          <Text>{8} Relays</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    position: 'absolute',
    top: 90,
    left: 10,
    borderWidth: 4,
    borderRadius: 100,
    borderColor: '#FFF',
  },
  action: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  nip5: {
    color: '#555',
    marginLeft: 2,
  },
  content: {
    paddingLeft: 10,
  },
  stats: {
    paddingVertical: 10,
  },
  username: {
    color: '#555',
  },
});
