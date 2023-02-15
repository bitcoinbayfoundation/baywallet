import { Button, Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useDataStore } from "../../store/DataProvider";
import { BaseComponent } from "../../components/base-component";
import { Channel } from "../../components/lightning/channel";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsParamList } from "src/navigation/SettingsParamList";

type ChannelsScreenProp = NativeStackNavigationProp<SettingsParamList, "channels">

export const Channels = observer(() => {
  const navigation = useNavigation<ChannelsScreenProp>()
  const {lightningStore, lightningStore: {channels}} = useDataStore()

  useEffect(() => {
    lightningStore.getChannels()
  }, [])

  return (
    <BaseComponent>
      <TopNavigation
        title='Channels'
        alignment='center'
        accessoryLeft={<TopNavigationAction onPress={() => navigation.goBack()} icon={<Icon name="arrow-ios-back-outline" />}/>}
        accessoryRight={<TopNavigationAction icon={<Icon name="plus-outline" />}/>}
      />
      <Divider />
      <Layout>
        {channels?.map(chan => <Channel key={chan.channel_id} channel={chan} />)}  
      </Layout>
    </BaseComponent>
  )
})