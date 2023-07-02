import React from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { StyleSheet } from "react-native";
import { View, TouchableOpacity } from "react-native-ui-lib";
import { useDataStore } from "../../../store";
import { BaseComponent, MediumText } from "../../../components";
import { SettingsParamList } from "../../../navigation";
import { lspNodeDev } from "../../../util/config";
import { log } from "../../../util/logger";

type LightningSettingProps = NativeStackNavigationProp<SettingsParamList, "lightning-settings">

export const LightningSettings = observer(() => {
  const navigation = useNavigation<LightningSettingProps>()
  const { lightningStore, lightningStore: { nodeId } } = useDataStore()

  return (
    <BaseComponent>
      <View>
        <TouchableOpacity style={styles.lightningSettings} onPress={() => console.log(nodeId)}>
          <MediumText content="Node Id" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.lightningSettings} onPress={() => navigation.navigate("channels")} row>
          <MediumText content="Channels" />
          <MediumText content=">" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.lightningSettings} onPress={async () => {
          const peer = await lightningStore.addPeer(lspNodeDev.address, lspNodeDev.port, lspNodeDev.pubKey)
          return Toast.show({ type: "success", text1: "Added peer!", text2: JSON.stringify(peer) })
        }} row>
          <MediumText content="Add Peer" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.lightningSettings} onPress={async () => {
          const peers = await lightningStore.getPeers()
          if (peers.length === 0) return alert("No peers")
          return Toast.show({ type: "success", text1: "Peers", text2: JSON.stringify(peers) })
        }} row>
          <MediumText content="Get Peers" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.lightningSettings} onPress={async () => {
          const invoice = await lightningStore.createInvoice(100, "who you callin pinhead?")
          log.ldk(invoice.to_str)
        }} row>
          <MediumText content="Create Invoice" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.lightningSettings} onPress={async () => {
          const balance = await lightningStore.getNodeBalance()
          return Toast.show({ type: "success", text1: "Peers", text2: `${balance} sats` })
        }} row>
          <MediumText content="Node Balance" />
        </TouchableOpacity>
      </View>
    </BaseComponent>
  )
})

const styles = StyleSheet.create({
  lightningSettings: {
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  }
})