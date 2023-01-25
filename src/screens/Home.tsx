import React, {useEffect, useState} from 'react';
import { observer } from 'mobx-react';
import store from "../store"
import { Button, TopNavigation, Text } from '@ui-kitten/components';
import { BaseComponent } from '../components/base-component';
import { setupLdk } from '../ldk';

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
    <BaseComponent>
      <TopNavigation title='MyApp' alignment='center'/>
      <Text style={{textAlign: 'center', paddingTop: '10%'}}>
        Bay Wallet
      </Text>
      <Text style={{textAlign: 'center', paddingTop: '10%'}}>142,300 sats</Text>
      <Button onPress={() => navigation.navigate("receive")}>Receive</Button>
      <Button onPress={() => navigation.navigate("send")}>Send</Button>
    </ BaseComponent>
  );
});

export default Home;

