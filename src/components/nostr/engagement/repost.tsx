import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { View, Icon, Text } from 'react-native-ui-lib';

type RepostProps = {
  engage: () => void;
  reposts?: number;
};
export const Repost = ({ engage, reposts }: RepostProps) => {
  return (
    <Pressable onPress={() => engage()}>
      <View row centerV>
        <Icon
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/5825/5825574.png',
          }}
          size={25}
        />
        <Text style={styles.reposts}>{reposts ?? ''}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  reposts: {
    paddingLeft: 5,
    color: '#888',
  },
});
