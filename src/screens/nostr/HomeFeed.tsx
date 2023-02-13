import React, {useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Divider, Avatar, Layout, Text, TopNavigation } from "@ui-kitten/components";
import { NostrParamList } from "../../navigation/NostrParamList";
import { useDataStore } from "../../store/DataProvider";
import { BaseComponent } from "../../components/base-component";
import { Pressable } from "react-native";
import { Event } from "src/types/nostr";

type HomeFeedProps = NativeStackNavigationProp<NostrParamList, "nostr-home-feed">

export const HomeFeed = () => {
  const navigation = useNavigation<HomeFeedProps>()
  const { nostrStore, nostrStore: {events} } = useDataStore()
  useEffect(() => {
    (async () => {
      const events = await nostrStore.getEvents()
      console.log(events)
    })
  })
  return (
    <BaseComponent>
      <TopNavigation
        title='Nostr'
        alignment='center'
        accessoryLeft={
          <Pressable onPress={() => navigation.navigate("nostr-profile")}>
            <Avatar size="small" source={{uri: "https://imgs.search.brave.com/YNXEA32jN7sny1_exSTuwQvGpJDze3_j7do0sIWrk3c/rs:fit:1200:789:1/g:ce/aHR0cDovL3ZpZ25l/dHRlMS53aWtpYS5u/b2Nvb2tpZS5uZXQv/c3BvbmdlYm9iL2lt/YWdlcy9lL2VmL1do/b195b3VfY2FsbGlu/X1BpbmhlYWRfYnlf/Y3VzYWNrYW5uZS0x/LS5wbmcvcmV2aXNp/b24vbGF0ZXN0P2Ni/PTIwMTIwMTI5MTMx/MjM1"}} />
          </Pressable>
        }
      />
      <Divider />
      <Layout>
        <Text>Home Feed</Text>
        <Button onPress={async () => await nostrStore.connectToRelay()}>Connect</Button>
        <Button onPress={async () => await nostrStore.getEvents()}>Get Events</Button>
        {events && (
          events.map(event => <Text>{event.id}</Text>)
        )}
      </Layout>
    </BaseComponent>
  )
}