import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type RepostProps = {
  engage: () => void;
  reposts?: number;
};
export const Repost = ({ engage, reposts }: RepostProps) => {
  return (
    <Pressable onPress={() => engage()}>
      <View row centerV>
        <CommunityIcons
          name="repeat-variant"
          size={25}
          color={Colors.text}
        />
        <Text style={styles.reposts}>{reposts ?? ''}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  reposts: {
    paddingLeft: 5,
    color: Colors.text,
  },
});
