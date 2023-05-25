import React, {useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Divider, Avatar, Layout, TopNavigation, Button } from "@ui-kitten/components";
import { NostrParamList } from "../../navigation/NostrParamList";
import { useDataStore } from "../../store/DataProvider";
import { BaseComponent } from "../../components/base-component";
import { Pressable, ScrollView } from "react-native";
import { Note } from "../../components/note";
import { observer } from "mobx-react";

type HomeFeedProps = NativeStackNavigationProp<NostrParamList, "nostr-home-feed">

export const HomeFeed = observer(() => {
  const navigation = useNavigation<HomeFeedProps>()
  const { nostrStore, nostrStore: {events, relays} } = useDataStore()
   
  useEffect(() => {
    if (!relays) return
    nostrStore.getFollowingFeed()
  }, [])
  // const {events} = useNostrEvents({
  //   filter: {
  //     since: dateToUnix(new Date()),
  //     kinds: [1],
  //     authors: ["3f194d7cf5c59eca0145ed7804f0a67c0cc17b6ff6b4bd585821160dcf9d785b"]
  //   }
  // })
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
      <ScrollView>
        <Layout style={{marginHorizontal: 10}}>
          {events?.map(event => <Note key={event.id} note={event} />)}
        </Layout>
      </ScrollView>
    </BaseComponent>
  )
})