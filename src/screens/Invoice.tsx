import React from 'react';
import {observer} from 'mobx-react';
import {Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import { BaseComponent } from '../components/base-component';

export const Invoice = observer((props) => {
  return (
    <BaseComponent>
      <TopNavigation
        title="Receive"
        alignment="center"
        accessoryLeft={
          <TopNavigationAction
            onPress={() => props.navigation.navigate('home')}
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
