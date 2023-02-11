import {observer} from 'mobx-react';
import React, { useState } from 'react';
import {Divider, Icon, Text, Input, TopNavigation, TopNavigationAction, Button, Layout} from '@ui-kitten/components';
import {BaseComponent} from '../components/base-component';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParamList } from 'src/navigation/NavParamList';
import { useNavigation } from '@react-navigation/native';

type ReceiveScreenProps = NativeStackNavigationProp<NavParamList, 'receive'>

const pay_req = "lnbcrt20n1p37dmfqpp5meh0w4hsmyr64nwy2vzcpmlsycdlqrwwzha5r94t58aaxzv07zyqdqqcqzpgxqyz5vqsp5cgew5x6k4r3d5utgc7xjh44ctwnjcpm0dsvfhfdsv74mkk3fvg2q9qyyssqhcryq8lh2wv6mke23xarryrrnme8mwvq6sxjk60tgwprskyr5jlh3wu5fyv0wywehr6ut2c25q0tth5lhh2ry2szglglx9wmp4m7wusq34c8tg"
export const Receive = observer(() => {
  const navigation = useNavigation<ReceiveScreenProps>()
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
          onChange={change => setDescription(change.nativeEvent.text)}
          />
        <Button onPress={() => navigation.navigate("invoice", {payReq: pay_req, amount: amount, description: description})}>Create Invoice</Button>
      </Layout>
    </BaseComponent>
  );
});
