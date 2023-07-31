import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { observer } from "mobx-react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NostrParamList } from "../../navigation";
import { BaseComponent, SmallText } from "../../components";
import { ProfileInfo, FullPost } from "../../components/nostr";
import { useSubscribe } from "../../nostr";
import { relayUrls } from "../../util/config";
import { Kind } from "nostr-tools";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "react-native-ui-lib";

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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <>
          <SmallText content={profile.name} />
          {profile.nip05 && (
            <MaterialIcon
              name="verified"
              size={15}
              color={Colors.primary}
            />
          )}
        </>
      )
    })
  }, [])

  return (
    <BaseComponent>
      <ScrollView>
        <ProfileInfo profile={profile} />
        {events?.map(event => <FullPost key={event.id} metadata={profile} event={event} navigation={navigation} />)}
      </ScrollView >
    </BaseComponent>
  )
})