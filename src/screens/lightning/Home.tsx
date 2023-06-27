import React from 'react';
import {EmitterSubscription} from 'react-native';
import {observer} from 'mobx-react';
import {Button, TopNavigation, Layout, Divider} from '@ui-kitten/components';
import {
  BaseComponent,
  BottomDrawer,
  Loading,
  Transaction,
  Balance,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {NavParamList} from '../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDataStore} from '../../store';
import {useLightningNode} from '../../hooks';

type HomeScreenProp = NativeStackNavigationProp<NavParamList, 'home'>;

let logSubscription: EmitterSubscription | undefined;
let paymentSubscription: EmitterSubscription | undefined;
let onChannelSubscription: EmitterSubscription | undefined;
let backupSubscriptionId: string | undefined;

export const Home = observer(() => {
  const navigation = useNavigation<HomeScreenProp>();
  const {
    lightningStore: {transactions},
  } = useDataStore();
  const {appReady} = useLightningNode(
    logSubscription,
    paymentSubscription,
    onChannelSubscription,
    backupSubscriptionId,
  );

  if (!appReady) {
    return <Loading />;
  }

  return (
    <BaseComponent>
      <TopNavigation title="Bay Wallet" alignment="center" />
      <Divider />
      <Layout style={{alignItems: 'center', marginTop: '25%'}}>
        <Balance />
        <Layout style={{flexDirection: 'row', marginTop: '10%'}}>
          <Button
            style={{height: 10, width: 150, marginRight: 5}}
            onPress={() => navigation.navigate('receive')}>
            Receive
          </Button>
          <Button
            style={{height: 10, width: 150, marginLeft: 5}}
            onPress={() => navigation.navigate('scan')}>
            Send
          </Button>
        </Layout>
      </Layout>
      <BottomDrawer>
        {transactions?.map(tx => (
          <Transaction key={tx.payment_hash} transaction={tx} />
        ))}
      </BottomDrawer>
    </BaseComponent>
  );
});
