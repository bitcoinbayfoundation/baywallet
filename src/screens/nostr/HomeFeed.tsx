import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Divider, Avatar, Layout, TopNavigation } from "@ui-kitten/components";
import { Pressable, ScrollView } from "react-native";
import { observer } from "mobx-react";
import { NostrParamList } from "../../navigation";
import { useDataStore } from "../../store";
import { BaseComponent, Note } from "../../components";
import { npubToHex, useProfile } from "../../nostr";
import { useCachedProfile, useHomeFeed } from "../../hooks/nostr";
import { getItem } from "../../util/storage";

type HomeFeedProps = NativeStackNavigationProp<NostrParamList, "nostr-home-feed">

export const HomeFeed = observer(() => {
  const navigation = useNavigation<HomeFeedProps>()
  const { keyStore: {nostrKeys} } = useDataStore()
  const { feed } = useHomeFeed()
  const { profile } = useCachedProfile(nostrKeys.pubkey)
  
  return (
    <BaseComponent>
      <TopNavigation
        title='Nostr'
        alignment='center'
        accessoryLeft={
          <Pressable onPress={() => navigation.navigate("nostr-profile", {pubkey: nostrKeys.pubkey})}>
            <Avatar size="small" source={{uri: profile?.picture }} />
          </Pressable>
        }
      />
      <Divider />
      <ScrollView>
        <Layout style={{marginHorizontal: 10}}>
          {feed?.map(event => <Note key={event.id} note={event} navigation={navigation} />)}
        </Layout>
      </ScrollView>
    </BaseComponent>
  )
})