import React from 'react';
import {Avatar, Divider, Layout, Text} from '@ui-kitten/components';
import {Event} from 'nostr-tools';
import {Pressable} from 'react-native';
import {Metadata} from '../types/nostr';

type NoteProps = {note: Event; profile: Metadata; navigation?: any};
export const Note = ({note, profile, navigation}: NoteProps) => {
  // const { profile } = useCachedProfile(note.pubkey)
  return (
    <>
      <Layout
        style={{marginVertical: 10, display: 'flex', flexDirection: 'row'}}>
        <Pressable
          onPress={() =>
            navigation.navigate('nostr-profile', {pubkey: profile?.pubkey})
          }>
          <Avatar size="medium" source={{uri: profile?.picture}} />
        </Pressable>
        <Layout
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '85%',
            marginLeft: 10,
          }}>
          <Text style={{color: '#AAA'}}>@{profile?.name}</Text>
          <Text style={{marginTop: 5}}>{note.content}</Text>
        </Layout>
      </Layout>
      <Divider />
    </>
  );
};
