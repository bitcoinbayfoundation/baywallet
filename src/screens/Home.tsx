import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import store from '../store';
import {Button, TopNavigation, Text, Layout, Divider} from '@ui-kitten/components';
import {BaseComponent} from '../components/base-component';
import {setupLdk} from '../ldk';
import ldk from "@synonymdev/react-native-ldk/dist/ldk"

const Home = observer(({navigation}) => {
  const {nodeId, channels, balance, peers, getLightningInfo, addPeer, getNodeId, getNodeBalance, getChannels, getPeers} = store.lightningStore;
  const [nodeStarted, setNodeStarted] = useState(false);
  const connect = async () => {
    ldk.reset();
    await setupLdk()
    setNodeStarted(true);
  };
  useEffect(() => {
    if (nodeStarted) return
    connect();
  }, [nodeStarted]);

  return (
    <BaseComponent>
      <TopNavigation
        title='Bay Wallet'
        alignment='center'
      />
      <Divider />
      <Layout style={{flex:1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{textAlign: 'center', paddingTop: '10%', fontSize: 40}}>142,300 sats</Text>
        <Layout style={{flex: 1, flexDirection: "row", justifyContent: "space-around", height: "100%"}}>
          <Button style={{height: 10, width: 150}} onPress={() => navigation.navigate('receive')}>Receive</Button>
          <Button style={{height: 10, width: 150}} onPress={() => navigation.navigate('send')}>Send</Button>
        </Layout>
        <Text>Node Id: {nodeId}</Text>
        {/* <Text>Balance: {balance}</Text> */}
        {/* <Text>Channels: {JSON.stringify(channels)}</Text> */}
        {/* <Text>Peers:: {JSON.stringify(peers)}</Text> */}
        <Button style={{height: 10, width: 150}} onPress={async () => await getLightningInfo()}>Get Node Id</Button>
      </Layout>
    </BaseComponent>
  );
});

export default Home;
