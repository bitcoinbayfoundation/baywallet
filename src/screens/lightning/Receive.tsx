import React from 'react';
import { Share, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import Toast from 'react-native-toast-message';
import { View } from 'react-native-ui-lib';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import { RouteProp } from '@react-navigation/native';
import { BaseComponent, Button, LargeText } from '../../components';
import { LightningParamList } from '../../navigation';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// type InvoiceScreenProp = NativeStackNavigationProp<LightningParamList, 'receive'>;

type ReceiveProps = {
  route?: RouteProp<LightningParamList, 'receive'>;
};

export const Receive = observer((props: ReceiveProps) => {
  const invoiceAmount = Number(props.route.params.invoice.amount_satoshis).toLocaleString()
  const payReq = props.route.params.invoice.to_str;

  const onShare = async () => {
    try {
      await Share.share({
        message: 'lightning:' + props.route.params.invoice.to_str,
      });
    } catch (error) {
      Toast.show({ type: "error", text1: "Error sharing invoice." })
    }
  };

  return (
    <BaseComponent>
      <View style={styles.receive} centerH>
        <LargeText content={`${invoiceAmount} sats`} styles={{ paddingBottom: 20 }} />
        <QRCode value={props.route.params.invoice.to_str} size={300} />
        <View style={{ paddingTop: 30 }} row>
          <Button
            label='Copy'
            size='large'
            onPress={() => {
              Clipboard.setString(payReq);
              Toast.show({ type: 'success', text1: 'Copied to clipboard.' });
            }}
          />
          <Button
            label='Share'
            size='large'
            onPress={() => onShare()}
          />
        </View>
      </View>
    </BaseComponent>
  );
});

const styles = StyleSheet.create({
  receive: {
    justifyContent: "space-between",
    paddingTop: 50,
  }
})
