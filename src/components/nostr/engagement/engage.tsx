import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Reply } from './reply';
import { Repost } from './repost';
import { Reaction } from './reaction';

export type EngageProps = {
  replyFn: () => void;
  repostFn: () => void;
  reactionFn: () => void;
};

export const Engage = ({ replyFn, repostFn, reactionFn }: EngageProps) => {
  return (
    <View row space-between style={styles.bar}>
      <Reply engage={replyFn} />
      <Repost engage={repostFn} />
      <Reaction engage={reactionFn} />
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: '75%',
    display: 'flex',
    justifyContent: 'space-around',
    paddingHorizontal: 0,
  },
});
