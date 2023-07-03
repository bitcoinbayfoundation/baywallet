import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';
import CommuntyIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type ReplyProps = {
  engage: () => void;
  replies?: number;
};
export const Reply = ({ engage, replies }: ReplyProps) => {
  return (
    <Pressable onPress={() => engage()}>
      <View row centerV>
        <CommuntyIcon
          name="reply-outline"
          size={25}
          color={Colors.text}
        />
        <Text style={styles.replies}>{replies ?? ''}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  replies: {
    paddingLeft: 5,
    color: Colors.text,
  },
});
