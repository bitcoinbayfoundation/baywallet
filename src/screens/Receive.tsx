import {observer} from 'mobx-react';
import React, { useState } from 'react';
import {Divider, Icon, Input, Text, TopNavigation, TopNavigationAction, Button, Layout} from '@ui-kitten/components';
import {BaseComponent} from '../components/base-component';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParamList } from 'src/navigation/NavParamList';
import { useNavigation } from '@react-navigation/native';

type ReceiveScreenProps = NativeStackNavigationProp<NavParamList, 'receive'>

export const Receive = observer(() => {
  const navigation = useNavigation<ReceiveScreenProps>()
  const [amount, setAmount] = useState<any>("")
  const [description, setDescription] = useState<any>("")
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
          onChange={change => setAmount(change)}
          />
        <Input
          placeholder='Description'
          value={description}
          onChange={change => setDescription(change)}
          />
        <Button onPress={() => navigation.navigate("invoice", {payReq: "heyhowareya"})}>Create Invoice</Button>
      </Layout>
    </BaseComponent>
  );
});
