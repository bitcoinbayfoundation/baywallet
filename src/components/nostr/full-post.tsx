import React from 'react';
import { Event } from 'nostr-tools';
import { Avatar, Colors, Text, View } from 'react-native-ui-lib';
import { Metadata } from '../../types/nostr';
import { Pressable, StyleSheet } from 'react-native';
import { formatDate } from '../../util/date';
import { Engage } from './engagement/engage';
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

export type PostDetailProps = {
  event: Event;
  metadata: Metadata;
  navigation: any;
};

export const FullPost = ({
  event,
  metadata,
  navigation
}: PostDetailProps) => {
  const { time, date } = formatDate(event.created_at);

  return (
    <View style={styles.post}>
      <View row>
        <Avatar onPress={() => navigation.navigate("nostr-profile", { pubkey: event.pubkey, profile: metadata })} source={{ uri: metadata.picture }} />
        <View style={styles.information} centerV>
          <Pressable onPress={() => navigation.navigate("nostr-profile", { pubkey: event.pubkey, profile: metadata })}>
            <View row centerV>
              <Text text80BO style={styles.displayName}>
                {metadata.display_name}
              </Text>
              {metadata.nip05 && (
                <>
                  <MaterialIcon
                    name="verified"
                    size={15}
                    color={Colors.primary}
                  />
                  <Text style={styles.nip5}>
                    {metadata.nip05.split('@')[1]}
                  </Text>
                </>
              )}
            </View>
          </Pressable>
          <View row>
            <Date text={time} />
            <Date text={' • '} />
            <Date text={date} />
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text text70>{event.content}</Text>
      </View>
      <View row style={styles.share}>
        <Engage replyFn={() => null} repostFn={() => null} reactionFn={() => null} />
        <Pressable onPress={() => null}>
          <MaterialIcon
            name="share"
            size={20}
            color={Colors.text}
          />
        </Pressable>
      </View>
    </View>
  );
};

const Date = ({ text }: { text: string }) => (
  <Text style={styles.postDate}>{text}</Text>
);

const styles = StyleSheet.create({
  post: {
    padding: 10,
  },
  information: {
    paddingLeft: 8,
  },
  postDate: {
    color: '#777',
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  nip5: {
    color: '#555',
    marginLeft: 2,
  },
  displayName: {
    paddingRight: 2,
  },
  share: {
    justifyContent: 'space-between',
    paddingRight: 20,
  },
});