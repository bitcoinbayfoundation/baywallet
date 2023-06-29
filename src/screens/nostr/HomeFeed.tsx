import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native-ui-lib"
import { ScrollView, StyleSheet } from "react-native";
import { observer } from "mobx-react";
import { NostrParamList } from "../../navigation";
import { useDataStore } from "../../store";
import { BaseComponent, Loading } from "../../components";
import { useHomeFeed } from "../../hooks/nostr";
import { Event } from "nostr-tools"
import { FeedPost } from "../../components/nostr";

type HomeFeedProps = NativeStackNavigationProp<NostrParamList, "nostr-home-feed">

export const HomeFeed = observer(() => {
  const navigation = useNavigation<HomeFeedProps>()
  const { keyStore: { nostrKeys } } = useDataStore()
  const { feed, feedEnded } = useHomeFeed()
  if (!feed && !feedEnded) return <BaseComponent><Loading /></BaseComponent>

  return (
    <BaseComponent>
      <ScrollView>
        <View flex row>
          <View flex>
            {feed
              .filter((_, index) => index % 2 === 0)
              .map(event => <FeedPost key={event.id} event={event as Event} navigation={navigation} />
              )}
          </View>
          <View flex>
            {feed
              .filter((_, index) => index % 2 === 1)
              .map(event => <FeedPost key={event.id} event={event as Event} navigation={navigation} />
              )}
          </View>
        </View>
      </ScrollView>
    </BaseComponent>
  )
})

const styles = StyleSheet.create({
  feedContainer: {
    marginHorizontal: 10
  }
})