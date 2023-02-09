import {observer} from 'mobx-react';
import React, { useState } from 'react';
import {Divider, Icon, Input, Text, TopNavigation, TopNavigationAction, Button, Layout} from '@ui-kitten/components';
import {BaseComponent} from '../components/base-component';

export const Receive = observer(({navigation}) => {
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
