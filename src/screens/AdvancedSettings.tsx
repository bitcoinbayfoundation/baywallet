import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, Layout, TopNavigation, Divider, Icon, TopNavigationAction, ListItem } from "@ui-kitten/components";
import { observer } from "mobx-react";
import React from "react";
import { useDataStore } from "../store/DataProvider";
import { BaseComponent } from "../components/base-component";
import { SettingsParamList } from "../navigation/SettingsParamList";
import { lndDevNode } from "../util/config";

type AdvancedSettingProps = NativeStackNavigationProp<SettingsParamList, "advanced-settings">

export const AdvancedSettings = observer(() => {
  const navigation = useNavigation<AdvancedSettingProps>()
  const {lightningStore, lightningStore: {nodeId}} = useDataStore()
  return (
    <BaseComponent>
      <TopNavigation
        title='Advanced Settings (LDK)'
        alignment='center'
        accessoryLeft={<TopNavigationAction onPress={() => navigation.goBack()} icon={<Icon name="arrow-ios-back-outline" />}/>}
      />
      <Divider />
      <Layout>
        <ListItem
          title="Get node id"
          onPress={() => alert(nodeId)}
        />
        <ListItem
          title="List channels"
          onPress={async () => {
            const channels = await lightningStore.getChannels()
            return alert(channels)
          }}
        />
        <ListItem
          title="Add peer"
          onPress={async () => {
            console.log(lndDevNode)
            const peer = await lightningStore.addPeer(lndDevNode.address, lndDevNode.port, lndDevNode.pubKey)
            return alert(peer)
          }}
        />
        <ListItem
          title="Get peers"
          onPress={async () => {
            const peers = await lightningStore.getPeers()
            if (peers.length === 0) return alert("No peers")
            return alert(peers)
          }}
        />
        <ListItem
          title="Create Invoice"
          onPress={async () => {
            const invoice = await lightningStore.createInvoice(100, "who you callin pinhead?")
            console.log(invoice.to_str)
          }}
        />
        <ListItem
          title="Get node balance"
          onPress={async () => {
            const balance = await lightningStore.getNodeBalance()
            console.log(balance)
            return alert(balance + " sats")
          }}
        />
        
        
      </Layout>
    </BaseComponent>
  )
})