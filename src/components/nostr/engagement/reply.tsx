import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { View, Icon, Text } from 'react-native-ui-lib';

type ReplyProps = {
  engage: () => void;
  replies?: number;
};
export const Reply = ({ engage, replies }: ReplyProps) => {
  return (
    <Pressable onPress={() => engage()}>
      <View row centerV>
        <Icon
          source={{
            uri: 'https://cdn.icon-icons.com/icons2/2066/PNG/512/reply_icon_125173.png',
          }}
          size={20}
        />
        <Text style={styles.replies}>{replies ?? ''}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  replies: {
    paddingLeft: 5,
    color: '#888',
  },
});
