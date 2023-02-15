import { Divider, Icon, Layout, Modal, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useDataStore } from "../../store/DataProvider";
import { BaseComponent } from "../../components/base-component";
import { Channel } from "../../components/lightning/channel";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsParamList } from "src/navigation/SettingsParamList";

type ChannelsScreenProp = NativeStackNavigationProp<SettingsParamList, "channels">

export const Channels = observer(() => {
  const navigation = useNavigation<ChannelsScreenProp>()
  const [openChannel, setOpenChannel] = useState<boolean>(false)
  const {lightningStore, lightningStore: {channels}} = useDataStore()

  useEffect(() => {
    lightningStore.getChannels()
  }, [])

  return (
    <>
    <BaseComponent>
      <TopNavigation
        title='Channels'
        alignment='center'
        accessoryLeft={<TopNavigationAction onPress={() => navigation.goBack()} icon={<Icon name="arrow-ios-back-outline" />}/>}
        accessoryRight={<TopNavigationAction onPress={() => setOpenChannel(true)} icon={<Icon name="plus-outline" />}/>}
      />
      <Divider />
      <Layout>
        {channels?.map(chan => <Channel key={chan.channel_id} channel={chan} />)}  
      </Layout>
    </BaseComponent>
    <OpenChannelModal show={openChannel} setShow={setOpenChannel}/>
    </>
  )
})

const OpenChannelModal = ({show, setShow}: {show: boolean, setShow: any}) => {
  return (
    <Modal style={{width: "75%", height: "50%", borderWidth: 1, borderColor: "#AAA", borderRadius: 25, display: "flex", justifyContent: "center", alignItems: "center"}} visible={show} onBackdropPress={() => setShow(false)}>
      <Text>ooo look at me, opening channels!</Text>
    </Modal>
  )
}