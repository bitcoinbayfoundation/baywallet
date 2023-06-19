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
import { Metadata } from "../../types/nostr";

type HomeFeedProps = NativeStackNavigationProp<NostrParamList, "nostr-home-feed">

export const HomeFeed = observer(() => {
  const navigation = useNavigation<HomeFeedProps>()
  const { keyStore: { nostrKeys } } = useDataStore()
  const { feed, feedEnded, profiles } = useHomeFeed()
  const { profile } = useCachedProfile(nostrKeys.pubkey)
  if (!feed && !feedEnded && !profiles) return <Loading />

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
          {feed && profiles && feed.map(event => {
            let profile: Metadata = profiles?.find(profile => profile.pubkey === event.pubkey)
            if (!profile || profile === undefined) {
              profile = { pubkey: event.pubkey, name: "Unknown", picture: "https://i.imgur.com/2xW3b2F.png" }
            }
            return <Note key={event.id} note={event as Event} profile={profile} navigation={navigation} />
          })}
        </Layout>
      </ScrollView>

    </BaseComponent>
  )
})