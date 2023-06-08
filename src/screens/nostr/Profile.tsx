import React from "react";
import { Pressable } from "react-native";
import { observer } from "mobx-react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Avatar, Divider, Icon, Layout, Text, TopNavigation } from "@ui-kitten/components";
import { NostrParamList } from "../../navigation";
import { BaseComponent, Note } from "../../components";
import { useProfile, useNostrEvents } from "../../nostr";
import { useDataStore } from "../../store";
import { useCachedProfile } from "../../hooks/nostr";
import { Banner } from "../../components/nostr/banner";

type ProfileScreenProps = NativeStackNavigationProp<NostrParamList, "nostr-profile">

type ProfileProps = {
  route?: RouteProp<NostrParamList, "nostr-profile">;
};

export const Profile = observer((props: ProfileProps) => {
  const navigation = useNavigation<ProfileScreenProps>()
  const { keyStore: {nostrKeys} } = useDataStore()
  const {profile} = useCachedProfile(props.route.params.pubkey)

  const {events} = useNostrEvents({
    filter: {
      since: 1,
      kinds: [1],
      authors: [props.route.params.pubkey]
    }
  })

  return (
    <BaseComponent>
      <TopNavigation
        title='Profile'
        alignment='center'
        accessoryLeft={
          <Pressable onPress={() => navigation.navigate("nostr-profile")}>
            <Avatar size="small" source={{uri: profile?.picture}} />
          </Pressable>
        }
      />
      <Divider />
      <Banner profile={profile} />
      <Text style={{padding: 5}}>{profile?.about}</Text>
      <Divider />
      {events?.map(event => <Note key={event.id} note={event} />)}
    </BaseComponent>
  )
})