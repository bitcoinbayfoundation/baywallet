import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Divider, Avatar, Layout, TopNavigation } from "@ui-kitten/components";
import { Pressable, ScrollView } from "react-native";
import { observer } from "mobx-react";
import { NostrParamList } from "../../navigation";
import { useDataStore } from "../../store";
import { BaseComponent, Loading, Note } from "../../components";
import { useCachedProfile, useHomeFeed } from "../../hooks/nostr";
import { Event } from "nostr-tools"

type HomeFeedProps = NativeStackNavigationProp<NostrParamList, "nostr-home-feed">

export const HomeFeed = observer(() => {
  const navigation = useNavigation<HomeFeedProps>()
  const { keyStore: { nostrKeys } } = useDataStore()
  const { feed, eose } = useHomeFeed()
  const { profile } = useCachedProfile(nostrKeys.pubkey)

  if (!feed && !eose) return <Loading />

  return (
    <BaseComponent>
      <TopNavigation
        title='Nostr'
        alignment='center'
        accessoryLeft={
          <Pressable onPress={() => navigation.navigate("nostr-profile", { pubkey: nostrKeys.pubkey })}>
            <Avatar size="small" source={{ uri: profile?.picture }} />
          </Pressable>
        }
      />
      <Divider />
      <ScrollView>
        <Layout style={{ marginHorizontal: 10 }}>
          {feed?.map(event => <Note key={event.id} note={event as Event} navigation={navigation} />)}
        </Layout>
      </ScrollView>

    </BaseComponent>
  )
})