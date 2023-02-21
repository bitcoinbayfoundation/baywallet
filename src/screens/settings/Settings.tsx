import React, { useEffect } from "react";
import { BaseComponent } from "../../components/base-component";
import { Button, Icon, ListItem, Text, Toggle, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import { useDataStore } from "../../store/DataProvider";
import { SettingsParamList } from "../../navigation/SettingsParamList";

type SettingsScreenProp = NativeStackNavigationProp<SettingsParamList, 'settings'>

export const Settings = observer(() => {
  const navigation = useNavigation<SettingsScreenProp>()
  const {settingsStore: {settings}, settingsStore} = useDataStore()
  
  return (
    <BaseComponent>
      <TopNavigation
        title='Settings'
        alignment='center'
      />
      <ListItem
        title="Hide Balance"
        accessoryRight={ <Toggle checked={settings.hideBalance} onChange={async () => await settingsStore.setSetting("hideBalance", !settings.hideBalance)} />}
      />
      <ListItem
        title="Display Shitty Fiat"
        accessoryRight={ <Toggle checked={settings.usd} onChange={async () => await settingsStore.setSetting("usd", !settings.usd)} />}
      />
      <ListItem
        title="Advanced User (LDK)"
        accessoryRight={<Icon name="arrow-ios-forward-outline" fill="#FFF" />}
        onPress={() => navigation.navigate("advanced-settings")}
      />
      <Button onPress={async () => settingsStore.settingsInit()}>wipe</Button>
    </BaseComponent>
  )
})