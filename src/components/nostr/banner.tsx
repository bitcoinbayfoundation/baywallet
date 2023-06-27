import React from 'react';
import {Avatar, Layout, Text, Icon, StyleService} from '@ui-kitten/components';
import {Metadata} from '../../nostr';

export const Banner = ({profile}: {profile: Metadata}) => {
  return (
    <Layout style={styles.layout}>
      <Avatar size="giant" source={{uri: profile?.picture}} />
      <Layout style={{paddingLeft: 10, justifyContent: 'center'}}>
        <Text category="h5">{profile?.display_name}</Text>
        <Layout style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: '#AAA'}}>@{profile?.name}</Text>
          <Icon
            style={{width: 15, height: 15, paddingHorizontal: 10}}
            fill="#F7EF8A"
            name="checkmark-circle-2-outline"
          />
          <Text>{profile?.nip05.split('@')[1]}</Text>
        </Layout>
        <Text style={{width: '50%', overflow: 'hidden'}}>{}</Text>
      </Layout>
    </Layout>
  );
};

const styles = StyleService.create({
  layout: {padding: 5, display: 'flex', flexDirection: 'row'},
});
