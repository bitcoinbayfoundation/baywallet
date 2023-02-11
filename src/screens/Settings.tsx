import React, { useEffect } from "react";
import { BaseComponent } from "../components/base-component";
import { Icon, ListItem, Text, Toggle, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import { useDataStore } from "../store/DataProvider";
import { SettingsParamList } from "../navigation/SettingsParamList";

type SettingsScreenProp = NativeStackNavigationProp<SettingsParamList, 'settings'>

export const Settings = observer(() => {
  const navigation = useNavigation<SettingsScreenProp>()
  const {settingsStore: {hideBalance}} = useDataStore()
  
  return (
    <BaseComponent>
      <TopNavigation
        title='Settings'
        alignment='center'
      />
      <ListItem
        title="Hide Balance"
        accessoryRight={ <Toggle checked={hideBalance} onChange={() => console.log(hideBalance)} />}
        onPress={() => navigation.navigate("advanced-settings")}
      />
      <ListItem
        title="Advanced User (LDK)"
        accessoryRight={<Icon name="arrow-ios-forward-outline" fill="#FFF" />}
        onPress={() => navigation.navigate("advanced-settings")}
      />
    </BaseComponent>
  )
})