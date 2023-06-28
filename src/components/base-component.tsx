import React from 'react';
import { SafeAreaView } from 'react-native';
import { View, Colors } from 'react-native-ui-lib';
import { BottomTabBar } from '../navigation/bottom-tab-bar';

export const BaseComponent = ({ children }) => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.screenBG }}>
      <View width="100%" height="100%">
        {children}
      </View>
    </SafeAreaView>
  );
};
