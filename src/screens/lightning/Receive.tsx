import React from 'react';
import { Share } from 'react-native';
import { observer } from 'mobx-react';
import Toast from 'react-native-toast-message';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Button,
} from '@ui-kitten/components';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { BaseComponent } from '../../components';
import { LightningParamList } from '../../navigation';

type InvoiceScreenProp = NativeStackNavigationProp<LightningParamList, 'receive'>;

type ReceiveProps = {
  route?: RouteProp<LightningParamList, 'receive'>;
};

export const Receive = observer((props: ReceiveProps) => {
  const navigation = useNavigation<InvoiceScreenProp>();

  const onShare = async () => {
    try {
      await Share.share({
        message: 'lightning:' + props.route.params.invoice.to_str,
      });
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  return (
    <BaseComponent>
      <TopNavigation
        title="Receive"
        alignment="center"
        accessoryLeft={() =>
          <TopNavigationAction
            onPress={() => navigation.navigate('wallet')}
            icon={<Icon name="arrow-back" />}
          />
        }
      />
      <Divider />
      <Layout
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 20,
          height: '60%',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 30, paddingBottom: 30 }}>
          {Number(props.route.params.invoice.amount_satoshis).toLocaleString()}{' '}
          sats
        </Text>
        <QRCode value={props.route.params.invoice.to_str} size={300} />
        <Layout style={{ display: 'flex', flexDirection: 'row', paddingTop: 30 }}>
          <Button
            style={{ width: 100, marginHorizontal: 5 }}
            onPress={() => onShare()}
          >
            Share
          </Button>
          <Button
            style={{ width: 100, marginHorizontal: 5 }}
            onPress={() => {
              Clipboard.setString(props.route.params.invoice.to_str);
              Toast.show({ type: 'success', text1: 'Copied to clipboard.' });
            }}
          >
            Copy
          </Button>
        </Layout>
      </Layout>
    </BaseComponent>
  );
});
