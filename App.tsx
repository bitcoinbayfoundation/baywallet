import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import {connectToElectrum} from './src/electrs/electrs';
import {createNewAccount, getAccount} from './src/accounts';
import { ldkNetwork, setupLdk } from './src/ldk';
import ldk from "@synonymdev/react-native-ldk/dist/ldk"

const App = () => {
  const [nodeStarted, setNodeStarted] = useState(false);

  useEffect(() => {
    if (nodeStarted) return
    const connect = async () => {
      ldk.reset()      
      const electrumResponse = await connectToElectrum({});
      if (electrumResponse.isErr()) {
        console.log('ERROR CONNECTING TO ELECTRUM', electrumResponse);
        return;
      }
      console.log('CONNECTED TO ELECTRUM', electrumResponse);
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
    </SafeAreaView>
  );
};

export default App;
