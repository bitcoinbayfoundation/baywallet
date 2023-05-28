import React, { useState } from 'react';
import {observer} from 'mobx-react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {Divider, Icon, Text, Input, TopNavigation, TopNavigationAction, Button, Layout} from '@ui-kitten/components';
import {BaseComponent} from '../components';
import { NavParamList } from '../navigation';
import { useNavigation } from '@react-navigation/native';
import { useDataStore } from '../store';

type ReceiveScreenProps = NativeStackNavigationProp<NavParamList, 'receive'>

export const Receive = observer(() => {
  const navigation = useNavigation<ReceiveScreenProps>()
  const {lightningStore} = useDataStore()
  const [amount, setAmount] = useState<any>("")
  const [description, setDescription] = useState("")
  
  return (
    <BaseComponent>
      <TopNavigation
        title='Receive'
        alignment='center'
        accessoryLeft={<TopNavigationAction onPress={() => navigation.goBack()} icon={<Icon name="arrow-back" />}/>}
      />
      <Divider />
      <Layout>
        <Text>Receive</Text>
        <Input
          placeholder='Amount of sats'
          autoFocus={true}
          keyboardType="numeric"
          value={amount}
          onChange={change => setAmount(change.nativeEvent.text)}
          />
        <Input
          placeholder='Description'
          value={description}
          onChange={change =>  setDescription(change.nativeEvent.text)}
          />
        <Button onPress={async () => {
          const invoice = await lightningStore.createInvoice(Number(amount), description)
          navigation.navigate("invoice", {invoice: invoice})
        }}>Create Invoice</Button>
      </Layout>
    </BaseComponent>
  );
});
