import React from "react";
import { ScrollView } from "react-native";
import { observer } from "mobx-react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NostrParamList } from "../../navigation";
import { BaseComponent } from "../../components";
import { ProfileInfo, FullPost } from "../../components/nostr";
import { useSubscribe } from "../../nostr";
import { relayUrls } from "../../util/config";
import { Kind } from "nostr-tools";

type ProfileScreenProps = NativeStackNavigationProp<NostrParamList, "nostr-profile">

type ProfileProps = {
  route?: RouteProp<NostrParamList, "nostr-profile">;
};

export const Profile = observer((props: ProfileProps) => {
  const navigation = useNavigation<ProfileScreenProps>()
  const { pubkey, profile } = props.route.params

  const { events } = useSubscribe({
    relays: relayUrls,
    filters: [{
      since: 1,
      kinds: [Kind.Text],
      authors: [pubkey]
    }]
  })

  return (
    <BaseComponent>
      <ProfileInfo profile={profile} />
      <ScrollView>
        {events?.map(event => <FullPost key={event.id} profile={profile} note={event} />)}
      </ScrollView >
    </BaseComponent>
  )
})