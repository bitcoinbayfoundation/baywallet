import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {connectToElectrum} from './src/electrs/electrs';
import { setupLdk } from './src/ldk';
import ldk from "@synonymdev/react-native-ldk/dist/ldk"

const App = () => {
  const [nodeStarted, setNodeStarted] = useState(false);
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    if (nodeStarted) return
    const connect = async () => {
      ldk.reset()      
      const electrum = await connectToElectrum({});
      if (electrum.isErr()) {
        console.log('ERROR CONNECTING TO ELECTRUM', electrum);
        return;
      }
      console.log('CONNECTED TO ELECTRUM', electrum);

      const node = await setupLdk()

      if (node?.isErr()) {
        return console.log(`NODE STARTING ERROR: ${node.error.message}`)
      }
      setNodeStarted(true)
    };
    connect();
  }, [nodeStarted]);

  return (
    <SafeAreaView>
      <Text style={{textAlign: 'center', paddingTop: '10%'}}>heyhowareya</Text>
      <Text style={{textAlign: 'center', paddingTop: '10%'}}>{message}</Text>
    </SafeAreaView>
  );
};

export default App;
