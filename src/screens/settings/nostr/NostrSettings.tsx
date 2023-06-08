import React from 'react';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Button,
  Icon,
  ListItem,
  Toggle,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseComponent} from '../../../components';
import {useDataStore} from '../../../store';
import {SettingsParamList} from '../../../navigation';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import { setItem, storage } from '../../../util/storage';
type NostrSettingsScreenProp = NativeStackNavigationProp<
  SettingsParamList,
  'nostr-settings'
>;

export const NostrSettings = observer(() => {
  const navigation = useNavigation<NostrSettingsScreenProp>();
  const {keyStore: {nostrKeys}} = useDataStore();

  const resetFollowingPubkeys = async () => {
    await AsyncStorage.removeItem(`${nostrKeys.pubkey}-following`, () => {
      Toast.show({
        type: 'success',
        text1: 'Reset following pubkeys.',
      });
    });
  };

  return (
    <BaseComponent>
      <TopNavigation
        title="Nostr Settings"
        alignment="center"
        accessoryLeft={
          <TopNavigationAction
            onPress={() => navigation.goBack()}
            icon={<Icon name="arrow-ios-back-outline" />}
          />
        }
      />
      <ListItem
        title="Following Pubkeys"
        accessoryRight={
          <Button onPress={async () => await resetFollowingPubkeys()}>
            reset
          </Button>
        }
      />
      <ListItem
        title="Following Pubkeys"
        accessoryRight={
          <Button onPress={() => storage.set("nostr-profiles", JSON.stringify([]))}>
            reset
          </Button>
        }
      />
    </BaseComponent>
  );
});
