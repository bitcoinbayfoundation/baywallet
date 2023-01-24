import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import { observer } from 'mobx-react';
import store from "../store"
import { setupLdk } from '../ldk';
import { Button } from '@ui-kitten/components';

const Home = observer(({navigation}) => {
  const { nodeId, setNodeId } = store.lightningStore
  const [nodeStarted, setNodeStarted] = useState(false)
    const connect = async () => {
      // ldk.reset();
      // await setupLdk()
      setNodeStarted(true)
    };
  useEffect(() => {
    if (nodeStarted) return
    connect()
  }, [nodeStarted]);

  return (
    <>
      <Text style={{textAlign: 'center', paddingTop: '10%'}}>
        Bay Wallet
      </Text>
      <Text style={{textAlign: 'center', paddingTop: '10%'}}>142,300 sats</Text>
      <Button onPress={() => navigation.navigate("receive")}>Receive</Button>
      <Button onPress={() => navigation.navigate("send")}>Send</Button>
    </>
  );
});

export default Home;

