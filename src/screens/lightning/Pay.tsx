import React from 'react';
import {RouteProp} from '@react-navigation/native';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BaseComponent} from '../../components';
import {NavParamList} from '../../navigation';
import {Text} from '@ui-kitten/components';

// type PayScreenProps = NativeStackScreenProps<NavParamList, 'pay'>;

type Props = {
  route?: RouteProp<NavParamList, 'pay'>;
};

export const Pay = (props: Props) => {
  const {route} = props;
  console.log('route', route);
  return (
    <BaseComponent>
      <Text>NOT IMPLEMENTED</Text>
    </BaseComponent>
  );
};
