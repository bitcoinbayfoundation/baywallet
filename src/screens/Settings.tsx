import React from "react";
import { BaseComponent } from "../components/base-component";
import { Text } from "@ui-kitten/components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavParamList } from "../navigation/NavParamList";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";

type SettingsScreenProp = NativeStackNavigationProp<NavParamList, 'settings'>

export const Settings = observer(() => {
  const navigation = useNavigation<SettingsScreenProp>()
  return (
    <BaseComponent>
      <Text>Settings</Text>
    </BaseComponent>
  )
})