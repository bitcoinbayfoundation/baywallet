import React from 'react';
import { observer } from 'mobx-react';
import { Button } from "../../../components";
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { BaseComponent, MediumText } from '../../../components';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

// type NostrSettingsScreenProp = NativeStackNavigationProp<
//   SettingsParamList,
//   'nostr-settings'
// >;

/**
 * Nostr settings screen
 * TODO: With wiping data, have a confirm modal
 */
export const NostrSettings = observer(() => {
  return (
    <BaseComponent>
      <View style={styles.nostrSettings} row centerV>
        <MediumText content="Reset Following Pubkey" />
        <Button label='⚠️' size="medium" onPress={async () => Toast.show({ type: "info", text1: "NOT IMPLEMENTED" })} />
      </ View>
      <View style={styles.nostrSettings} row centerV>
        <MediumText content="Reset Cached Profiles" />
        <Button label='⚠️' size='medium' onPress={async () => Toast.show({ type: "info", text1: "NOT IMPLEMENTED" })} />
      </View>
    </BaseComponent>
  );
});

const styles = StyleSheet.create({
  nostrSettings: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
  }
})