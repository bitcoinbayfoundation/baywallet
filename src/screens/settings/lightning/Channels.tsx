import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native-ui-lib";
import { useDataStore } from "../../../store";
import { BaseComponent, Channel } from "../../../components";
import { SettingsParamList } from "../../../navigation";

type ChannelsScreenProp = NativeStackNavigationProp<SettingsParamList, "channels">

/**
 * Channels screen
 * TODO: Add channel creation
 * TODO: Add modal to view channel details
 * TODO: Pull to refresh
 */
export const Channels = observer((_: ChannelsScreenProp) => {
  const { lightningStore, lightningStore: { channels } } = useDataStore()

  useEffect(() => {
    lightningStore.getChannels()
  }, [])

  return (
    <BaseComponent>
      <View>
        {channels?.map(chan => <Channel key={chan.channel_id} channel={chan} />)}
      </View>
    </BaseComponent>
  )
})