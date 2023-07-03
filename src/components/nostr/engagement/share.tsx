import React from 'react';
import { Pressable } from 'react-native';
import { View, Colors } from 'react-native-ui-lib';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type ShareProps = {
  engage: () => void;
};
export const Share = ({ engage }: ShareProps) => {
  return (
    <Pressable onPress={() => engage()}>
      <View row centerV>
        <MaterialIcon
          name="share"
          size={20}
          color={Colors.text}
        />
      </View>
    </Pressable>
  );
};
