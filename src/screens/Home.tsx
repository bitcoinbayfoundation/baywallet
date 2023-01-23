import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import { observer } from 'mobx-react';
import store from "../store"
import { setupLdk } from '../ldk';
import ldk from '@synonymdev/react-native-ldk/dist/ldk';

const Home = observer(() => {
  const { nodeId, setNodeId } = store.lightningStore
  const [nodeStarted, setNodeStarted] = useState(false)
    const connect = async () => {
      // ldk.reset();
      // const electrum = await connectToElectrum({});
      // if (electrum.isErr()) {
      //   console.log('ERROR CONNECTING TO ELECTRUM', JSON.stringify(electrum.error));
      //   return;
      // }

      // console.log("ELECTRUM", electrum.value)
      // await setupLdk().catch(e => console.log(e));
      setNodeStarted(true)
    };
  useEffect(() => {
    if (nodeStarted) return
    console.log("HEY HOW ARE YA")
    connect()
  }, [nodeStarted]);

  return (
    <>
      <Text style={{textAlign: 'center', paddingTop: '10%'}}>
        {nodeId}
      </Text>
      <Button title="Set Node id" onPress={() => setNodeId("heyhowareya")} />
    </>
  );
});

export default Home;

