import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, useColorScheme} from 'react-native';
import {connectToElectrum} from './src/electrum';

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  const [nodeStarted, setNodeStarted] = useState(false);
  const connect = async () => {
    const conn = await connectToElectrum({});
    console.log('connection', conn);
    return conn;
  };
  useEffect(() => {
    connect();
  }, []);

  return (
    <SafeAreaView>
      <Text>heyhowareya</Text>
    </SafeAreaView>
  );
};

export default App;
