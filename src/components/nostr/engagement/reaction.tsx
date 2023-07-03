import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type ReactionProps = {
  engage: () => void;
  reactions?: number;
};
export const Reaction = ({ engage, reactions }: ReactionProps) => {
  return (
    <Pressable onPress={() => engage()}>
      <View row centerV>
        <CommunityIcon
          name="hand-clap"
          size={23}
          color={Colors.text}
        />
        <Text style={styles.reactions}>{reactions ?? ''}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  reactions: {
    paddingLeft: 5,
    color: Colors.text,
  },
});
