import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, useColorScheme} from 'react-native';
import { getBlockHeader } from './src/blocks/mempool';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const [nodeStarted, setNodeStarted] = useState(false);

  useEffect(() => {
    getBlockHeader()    
  }, [])

  return (
    <SafeAreaView>
      <Text>heyhowareya</Text>
    </SafeAreaView>
  );
};

export default App;
