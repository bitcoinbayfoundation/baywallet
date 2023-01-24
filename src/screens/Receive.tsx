import {observer} from 'mobx-react';
import React from 'react';
import {Text} from '@ui-kitten/components';
import {BaseComponent} from '../components/base-component';
export const Receive = observer(({navigation}) => {
  return (
    <BaseComponent>
      <Text>Receive</Text>
    </BaseComponent>
  );
});
