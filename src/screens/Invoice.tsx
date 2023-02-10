import React from 'react';
import {observer} from 'mobx-react';
import {Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import { BaseComponent } from '../components/base-component';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParamList } from '../navigation/NavParamList';
import { RouteProp, useNavigation } from '@react-navigation/native';

type InvoiceScreenProp = NativeStackNavigationProp<NavParamList, 'invoice'>

type InvoiceProps = {
  route?: RouteProp<NavParamList, 'invoice'>;
};

export const Invoice = observer((props:InvoiceProps) => {
  const navigation = useNavigation<InvoiceScreenProp>()
  return (
    <BaseComponent>
      <TopNavigation
        title="Receive"
        alignment="center"
        accessoryLeft={
          <TopNavigationAction
            onPress={() => navigation.navigate('home')}
            icon={<Icon name="arrow-back" />}
          />
        }
      />
      <Divider />
      <Layout>
        <Text>{props.route.params.payReq}</Text>
      </Layout>
    </BaseComponent>
  );
});
