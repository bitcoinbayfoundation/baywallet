import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Image, View, Text, Colors } from 'react-native-ui-lib';
import { Metadata } from '../../types/nostr';
import { Button } from '../misc/button';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type NostrProfile = {
  profile: Metadata;
};

export const ProfileInfo = ({ profile }: NostrProfile) => {
  return (
    <>
      <Image source={{ uri: profile.banner }} style={{ zIndex: -1 }} width='100%' height={125} />
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
              <MaterialIcon
                name="verified"
                size={15}
                color={Colors.primary}
              />
              <Text style={styles.nip5}>{profile.nip05.split('@')[1]}</Text>
            </>
          )}
        </View>
        <Text style={styles.username}>@{profile.username || profile.name}</Text>
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
    top: 80,
    left: 10,
    zIndex: 99,
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
