import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import { observer } from 'mobx-react';
import store from "../store"
import { setupLdk } from '../ldk';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavParamList } from '../navigation/NavParamList';
import { Button } from '@ui-kitten/components';

type HomeScreenProps = NativeStackScreenProps<NavParamList, 'home'>

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

