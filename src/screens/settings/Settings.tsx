import React from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Icon, Toggle, TopNavigation } from "@ui-kitten/components";
import { BaseComponent } from "../../components";
import { useDataStore } from "../../store";
import { SettingsParamList } from "../../navigation";
import { ListItem, Text, Switch, View } from "react-native-ui-lib"
import { StyleSheet } from "react-native";

type SettingsScreenProp = NativeStackNavigationProp<SettingsParamList, 'settings'>

export const Settings = observer(() => {
  const navigation = useNavigation<SettingsScreenProp>()
  const { settingsStore: { settings }, settingsStore } = useDataStore()

  return (
    <BaseComponent>
      <ListItem>
        <View row centerV style={styles.listItem}>
          <Text>Hide Balance</Text>
          <Switch value={settings.hideBalance} onValueChange={async () => await settingsStore.setSetting("hideBalance", !settings.hideBalance)} />
        </View>
      </ListItem>
      <ListItem>
        <View row centerV style={styles.listItem}>
          <Text>Display Shitty Fiat</Text>
          <Switch value={settings.usd} onValueChange={async () => await settingsStore.setSetting("usd", !settings.usd)} />
        </View>
      </ListItem>
      <ListItem
        title="Advanced User (LDK)"
        accessoryRight={<Icon name="arrow-ios-forward-outline" fill="#FFF" />}
        onPress={() => navigation.navigate("advanced-settings")}
      />
      <ListItem
        title="Nostr Settings"
        accessoryRight={<Icon name="arrow-ios-forward-outline" fill="#FFF" />}
        onPress={() => navigation.navigate("nostr-settings")}
      />
      <Button onPress={async () => settingsStore.settingsInit()}>wipe</Button>
    </BaseComponent>
  )
})

const styles = StyleSheet.create({
  listItem: {
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10
  }
})