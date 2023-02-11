import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import store from '../store';
import {Button, TopNavigation, Text, Layout, Divider, useTheme} from '@ui-kitten/components';
import {BaseComponent} from '../components/base-component';
import {setupLdk} from '../ldk';
import ldk from "@synonymdev/react-native-ldk/dist/ldk"
import { BottomDrawer } from '../components/bottom-drawer';
import { useNavigation } from '@react-navigation/native';
import { NavParamList } from '../navigation/NavParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';

type HomeScreenProp = NativeStackNavigationProp<NavParamList, 'home'>

const Home = observer(() => {
  const navigation = useNavigation<HomeScreenProp>()
  const {nodeId, channels, balance, peers, getLightningInfo, addPeer, getNodeId, getNodeBalance, getChannels, getPeers} = store.lightningStore;
  const [nodeStarted, setNodeStarted] = useState(false);
  const connect = async () => {
    // ldk.reset();
    // await setupLdk()
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
      <Layout style={{alignItems: "center", marginTop: "25%"}}>
        <Amount />
        <Layout style={{ flexDirection: "row", marginTop: "10%" }}>
          <Button style={{height: 10, width: 150, marginRight: 5}} onPress={() => navigation.navigate('receive')}>Receive</Button>
          <Button style={{height: 10, width: 150, marginLeft: 5}} onPress={() => navigation.navigate('scan')}>Send</Button>
        </Layout>
      </Layout>
      <BottomDrawer>
        <Text>Transaction List goes here</Text>
      </BottomDrawer>
    </BaseComponent>
  );
});

export default Home;

 // TODO: Add symbol referenced by user preference.
enum AmountView {
  Hidden = "hidden",
  Sats = "sats"
}
const Amount = () => {
  const [view, setView] = useState<AmountView>(AmountView.Sats)
  const {balance} = store.lightningStore
  const cycleAmountView = () => {
    switch(view) {
      case AmountView.Hidden:
        setView(AmountView.Sats)
        return
      case AmountView.Sats:
        setView(AmountView.Hidden)
        return
      default:
        return
    }
  }
  return (
    <Pressable onPress={() => cycleAmountView()}>
      <Layout style={{display: "flex", alignItems: "center", flexDirection: "row"}}>
        {/* <Satoshi color="#ff0000" style={{marginTop: , marginRight: 10}}/> */}
        <Text style={{textAlign: 'center', paddingTop: '10%', fontSize: 50}}>{view === AmountView.Sats ? balance.toLocaleString() + " sats" : "********"}</Text>
      </Layout>
    </Pressable>
  )
}
