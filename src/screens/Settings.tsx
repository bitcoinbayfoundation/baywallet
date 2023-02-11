import React, { useEffect } from "react";
import { BaseComponent } from "../components/base-component";
import { Text } from "@ui-kitten/components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavParamList } from "../navigation/NavParamList";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import { useDataStore } from "../store/DataProvider";
import { Button } from "@ui-kitten/components";

type SettingsScreenProp = NativeStackNavigationProp<NavParamList, 'settings'>

export const Settings = observer(() => {
  const navigation = useNavigation<SettingsScreenProp>()
  const {settingsStore} = useDataStore()

  return (
    <BaseComponent>
      <Text>Settings</Text>
      <Button onPress={async () => await settingsStore.getSettings()}>Settings</Button>
    </BaseComponent>
  )
})