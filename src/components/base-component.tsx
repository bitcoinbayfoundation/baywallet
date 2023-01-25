import React from 'react';
import {Layout, useTheme} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
export const BaseComponent = ({children}) => {
  const theme = useTheme()
  return (
    <SafeAreaView style={{backgroundColor:theme["background-basic-color-1"]}}>
      <Layout style={{margin: 0, padding: 0, height: '100%', width: '100%'}}>
        {children}
      </Layout>
    </SafeAreaView>
  );
};
