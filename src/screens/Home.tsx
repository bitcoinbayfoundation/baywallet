import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import store from '../store';
import {Button, TopNavigation, Text, Layout} from '@ui-kitten/components';
import {BaseComponent} from '../components/base-component';
import {setupLdk} from '../ldk';

const Home = observer(({navigation}) => {
  const {nodeId, setNodeId} = store.lightningStore;
  const [nodeStarted, setNodeStarted] = useState(false);
  const connect = async () => {
    // ldk.reset();
    // await setupLdk()
    setNodeStarted(true);
  };
  useEffect(() => {
    if (nodeStarted) return;
    connect();
  }, [nodeStarted]);

  return (
    <BaseComponent>
    <Layout style={{flex:1, justifyContent: "center", alignItems: "center"}}>
      <Text style={{textAlign: 'center', paddingTop: '10%', fontSize: 50}}>Bay Wallet</Text>
      <Text style={{textAlign: 'center', paddingTop: '10%'}}>142,300 sats</Text>
      <Layout style={{flex: 1, flexDirection: "row", justifyContent: "space-around"}}>
        <Button style={{height: 10, width: 150}} onPress={() => navigation.navigate('receive')}>Receive</Button>
        <Button style={{height: 10, width: 150}} onPress={() => navigation.navigate('send')}>Send</Button>
      </Layout>
    </Layout>
    </BaseComponent>
  );
});

export default Home;
