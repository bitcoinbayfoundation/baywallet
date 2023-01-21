import React, {useEffect} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import { observer } from 'mobx-react';
import store from "../store"
import { connectToElectrum } from '../electrs/electrs';
import { setupLdk } from '../ldk';
import ldk from '@synonymdev/react-native-ldk/dist/ldk';

const Home = observer(() => {
  const { nodeId, setNodeId } = store.lightningStore

  useEffect(() => {
    const connect = async () => {
      ldk.reset();
      const electrum = await connectToElectrum({});
      if (electrum.isErr()) {
        console.log('ERROR CONNECTING TO ELECTRUM', JSON.stringify(electrum.error));
        return;
      }

      console.log("ELECTRUM", electrum.value)
      const node = await setupLdk();

      if (node?.isErr()) {
        return console.log(`NODE STARTING ERROR: ${node.error.message}`);
      }
    };
    connect()
  }, []);

  return (
    <SafeAreaView>
      <Text style={{textAlign: 'center', paddingTop: '10%'}}>
        {nodeId}
      </Text>
      <Button title="Set Node id" onPress={() => setNodeId("heyhowareya")} />
    </SafeAreaView>
  );
});

export default Home;

