import {observer} from 'mobx-react';
import React from 'react';
import {Divider, Icon, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {BaseComponent} from '../components/base-component';

export const Receive = observer(({navigation}) => {
  return (
    <BaseComponent>
    <TopNavigation
        title='Receive'
        alignment='center'
        accessoryLeft={<TopNavigationAction onPress={() => navigation.goBack()} icon={<Icon name="arrow-back" />}/>}
      />
      <Divider />
      <Text>Receive</Text>
    </BaseComponent>
  );
});
