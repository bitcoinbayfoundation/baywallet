import React from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BaseComponent, MediumText } from "../../components";
import { useDataStore } from "../../store";
import { SettingsParamList } from "../../navigation";
import { Switch, View, TouchableOpacity, Colors } from "react-native-ui-lib"
import { StyleSheet } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

type SettingsScreenProp = NativeStackNavigationProp<SettingsParamList, 'settings'>

export const Settings = observer(() => {
  const navigation = useNavigation<SettingsScreenProp>()
  const { settingsStore: { settings }, settingsStore } = useDataStore()

  return (
    <BaseComponent>
      <View row centerV style={styles.switch}>
        <MediumText content="Hide Balance" />
        <Switch value={settings.hideBalance} onColor={Colors.primary} onValueChange={async () => await settingsStore.setSetting("hideBalance", !settings.hideBalance)} />
      </View>
      <View row centerV style={styles.switch}>
        <MediumText content="Display Shitty Fiat" />
        <Switch value={settings.usd} onColor={Colors.primary} onValueChange={async () => await settingsStore.setSetting("usd", !settings.usd)} />
      </View>
      <TouchableOpacity style={styles.switch} onPress={() => navigation.navigate("lightning-settings")} row>
        <MediumText content="Lightning Settings" />
        <MaterialIcon name="chevron-right" size={25} color={Colors.text} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.switch} onPress={() => navigation.navigate("nostr-settings")} row>
        <MediumText content="Nostr Settings" />
        <MaterialIcon name="chevron-right" size={25} color={Colors.text} />
      </TouchableOpacity>
      {/* <Button onPress={async () => settingsStore.settingsInit()}>wipe</Button> */}
    </BaseComponent >
  )
})

const styles = StyleSheet.create({
  switch: {
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  }
})