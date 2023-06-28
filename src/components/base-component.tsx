import React from 'react';
import { SafeAreaView } from 'react-native';
import { View, Colors } from 'react-native-ui-lib';

export const BaseComponent = ({ children }) => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.screenBG }}>
      <View width="100%" height="100%">
        {children}
      </View>
    </SafeAreaView>
  );
};
