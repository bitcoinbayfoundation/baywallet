import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import ldk from "@synonymdev/react-native-ldk/dist/ldk"
import {Button, TopNavigation, Text, Layout, Divider} from '@ui-kitten/components';
import {BaseComponent} from '../components/base-component';
import { BottomDrawer } from '../components/bottom-drawer';
import { useNavigation } from '@react-navigation/native';
import { NavParamList } from '../navigation/NavParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { useDataStore } from '../store/DataProvider';
import { setupLdk } from '../ldk';
import { Loading } from '../components/loading';

type HomeScreenProp = NativeStackNavigationProp<NavParamList, 'home'>

const Home = observer(() => {
  const navigation = useNavigation<HomeScreenProp>()
  const {lightningStore: {nodeId, balance}, lightningStore} = useDataStore()
  const [nodeStarted, setNodeStarted] = useState(false);
  const [appReady, setAppReady] = useState<boolean>()

  const connect = async () => {
    ldk.reset();
    await setupLdk()
    setNodeStarted(true);
  };
  const getInfo = async () => {
    await lightningStore.getLightningInfo()
    setAppReady(true)
  }
  useEffect(() => {
    if (nodeStarted) {
      getInfo()
      return
    }
    connect();
  }, [nodeStarted]);

  if(!appReady) return <Loading />

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
        <Text>TODO: Transaction component</Text>
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
  const {lightningStore: {balance}} = useDataStore()
  const [view, setView] = useState<AmountView>(AmountView.Sats)
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
        <Text style={{textAlign: 'center', paddingTop: '10%', fontSize: 50}}>{view === AmountView.Sats ? balance + " sats" : "********"}</Text>
      </Layout>
    </Pressable>
  )
}
