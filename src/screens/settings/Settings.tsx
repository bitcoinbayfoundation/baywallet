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
} from '@ui-kitten/components';
import {BaseComponent} from '../../components';
import {useDataStore} from '../../store';
import {SettingsParamList} from '../../navigation';

type SettingsScreenProp = NativeStackNavigationProp<
  SettingsParamList,
  'settings'
>;

export const Settings = observer(() => {
  const navigation = useNavigation<SettingsScreenProp>();
  const {
    settingsStore: {settings},
    settingsStore,
  } = useDataStore();

  return (
    <BaseComponent>
      <TopNavigation title="Settings" alignment="center" />
      <ListItem
        title="Hide Balance"
        accessoryRight={
          <Toggle
            checked={settings.hideBalance}
            onChange={async () =>
              await settingsStore.setSetting(
                'hideBalance',
                !settings.hideBalance,
              )
            }
          />
        }
      />
      <ListItem
        title="Display Shitty Fiat"
        accessoryRight={
          <Toggle
            checked={settings.usd}
            onChange={async () =>
              await settingsStore.setSetting('usd', !settings.usd)
            }
          />
        }
      />
      <ListItem
        title="Advanced User (LDK)"
        accessoryRight={<Icon name="arrow-ios-forward-outline" fill="#FFF" />}
        onPress={() => navigation.navigate('advanced-settings')}
      />
      <ListItem
        title="Nostr Settings"
        accessoryRight={<Icon name="arrow-ios-forward-outline" fill="#FFF" />}
        onPress={() => navigation.navigate('nostr-settings')}
      />
      <Button onPress={async () => settingsStore.settingsInit()}>wipe</Button>
    </BaseComponent>
  );
});
