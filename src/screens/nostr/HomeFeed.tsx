import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Divider, Layout, Text, TopNavigation } from "@ui-kitten/components";
import React from "react";
import { NostrParamList } from "src/navigation/NostrParamList";
import { BaseComponent } from "../../components/base-component";

type HomeFeedProps = NativeStackNavigationProp<NostrParamList, "nostr-home-feed">

export const HomeFeed = () => {
  const navigator = useNavigation<HomeFeedProps>()
  return (
    <BaseComponent>
      <TopNavigation
        title='Nostr'
        alignment='center'
      />
      <Divider />
      <Layout>
        <Text>Home Feed</Text>
      </Layout>
    </BaseComponent>
  )
}