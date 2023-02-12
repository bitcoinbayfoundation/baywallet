import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Divider, Layout, Text, TopNavigation } from "@ui-kitten/components";
import React from "react";
import { NostrParamList } from "../../navigation/NostrParamList";
import { useDataStore } from "../../store/DataProvider";
import { BaseComponent } from "../../components/base-component";

type HomeFeedProps = NativeStackNavigationProp<NostrParamList, "nostr-home-feed">

export const HomeFeed = () => {
  const navigator = useNavigation<HomeFeedProps>()
  const { nostrStore } = useDataStore()
  return (
    <BaseComponent>
      <TopNavigation
        title='Nostr'
        alignment='center'
      />
      <Divider />
      <Layout>
        <Text>Home Feed</Text>
        <Button onPress={async () => await nostrStore.getNostrProfile()}>Get Profile</Button>
      </Layout>
    </BaseComponent>
  )
}