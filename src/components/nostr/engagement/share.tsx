import React from 'react';
import { Pressable } from 'react-native';
import { View, Icon } from 'react-native-ui-lib';

type ShareProps = {
  engage: () => void;
};
export const Share = ({ engage }: ShareProps) => {
  return (
    <Pressable onPress={() => engage()}>
      <View row centerV>
        <Icon
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/640px-Bitcoin.svg.png',
          }}
          size={25}
        />
      </View>
    </Pressable>
  );
};
