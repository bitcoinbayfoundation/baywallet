import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { Modal } from 'react-native-ui-lib';
import { Button, MediumText } from '../../../components';
import Toast from 'react-native-toast-message';

export const NodeId = ({ data }) => {
  return (
    <Modal>
      <MediumText content="Your pubkey:" />
      <MediumText
        content={"heyhowareya"}
        props={{ lineBreakMode: 'clip', numberOfLines: 1 }}
        styles={{ width: '90%', paddingVertical: 10 }}
      />
      <Button
        label="Copy"
        size="medium"
        style={{ width: 100, marginHorizontal: 5 }}
        onPress={() => {
          Clipboard.setString(data.nodeId);
          Toast.show({ type: 'success', text1: 'Copied to clipboard.' });
        }}
      />
    </Modal>
  );
};
