import React, { useEffect, useState } from "react";
import { View } from "react-native-ui-lib";
import { BaseComponent, Button, MediumText } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { useSubscribe } from "../../nostr";
import { Kind, nip05 } from "nostr-tools";
import { relayUrls } from "../../util/config";
import { SuggestFollow } from "../../components/nostr";
import { ScrollView } from "react-native";
import _ from "lodash"

type NostrFollowProfilesScreenProps = NativeStackNavigationProp<OnboardParamList, "nostr-follow-profiles">

export const NostrFollowProfiles = () => {
  const navigation = useNavigation<NostrFollowProfilesScreenProps>()
  const [bitcoinBayPeople, setBitcoinBayPeople] = useState<string[]>(null)
  const [followList, setFollowList] = useState<string[]>([])

  useEffect(() => {
    const getBitcoinBayPeople = async () => {
      const people = await nip05.searchDomain("bitcoinbay.club")
      setBitcoinBayPeople(Object.values(people))
    }
    getBitcoinBayPeople()
  }, [])

  const { events } = useSubscribe({
    relays: relayUrls,
    filters: [{
      since: 0,
      kinds: [Kind.Metadata],
      authors: bitcoinBayPeople
    }],
    options: {
      enabled: !!bitcoinBayPeople
    }
  })

  const eventsWithoutDups = _.uniqBy(events, 'pubkey')

  return (
    <BaseComponent>
      <View height="100%">
        <MediumText content="Follow Bitcoin Bay members!" styles={{ textAlign: "center", marginBottom: 20 }} />
        <ScrollView>
          {eventsWithoutDups?.map(event => <SuggestFollow key={event.pubkey} event={event} followList={followList} setFollowList={setFollowList} />)}
        </ScrollView>
        <Button label="Continue" size="large" style={{ position: "absolute", bottom: 20 }} onPress={() => navigation.navigate("lightning-introduction")} />
      </View>
    </BaseComponent>
  )
}