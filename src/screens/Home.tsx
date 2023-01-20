import React, {useEffect} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import { getAccount } from '../accounts';
import { observer } from 'mobx-react';
import store from "../store"
import ldk from '@synonymdev/react-native-ldk/dist/ldk';
import { connectToElectrum } from '../electrs/electrs';
import { setupLdk } from '../ldk';

const Home = observer(() => {
  const { nodeId, setNodeId, account, setAccount } = store.lightningStore
  useEffect(() => {
    const account = async () => {
      const account = await getAccount()
      return account
    }
    account()
    // const connect = async () => {
    //   ldk.reset();
    //   const electrum = await connectToElectrum({});
    //   if (electrum.isErr()) {
    //     console.log('ERROR CONNECTING TO ELECTRUM', electrum);
    //     return;
    //   }

    //   const node = await setupLdk();

    //   if (node?.isErr()) {
    //     return console.log(`NODE STARTING ERROR: ${node.error.message}`);
    //   }
    // };
    // connect()
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

