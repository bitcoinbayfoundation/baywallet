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

type ProfileScreenProps = NativeStackNavigationProp<NostrParamList, "nostr-profile">

type ProfileProps = {
  route?: RouteProp<NostrParamList, "nostr-profile">;
};

export const Profile = observer((props: ProfileProps) => {
  const navigation = useNavigation<ProfileScreenProps>()
  const { keyStore: {nostrKeys} } = useDataStore()
  const { data: profile } = useProfile({
    pubkey: props.route.params.pubkey
  })

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
      <Layout style={{padding: 5, display: "flex", flexDirection: "row"}}>
        <Avatar size="giant" source={{uri: profile?.picture}} />
        <Layout style={{paddingLeft: 10, justifyContent: "center"}}>
          <Text category="h5">{profile?.display_name}</Text>
          <Layout style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{color: "#AAA"}}>@{profile?.name}</Text>
            <Icon style={{width: 15, height: 15, paddingHorizontal: 10 }} fill="#F7EF8A" name="checkmark-circle-2-outline"/>
            <Text>{profile?.nip05.split("@")[1]}</Text>
          </Layout>
          {/* <Text style={{width: "50%", overflow: "hidden" }}>{profile?.npub}</Text> */}
        </Layout>
      </Layout>
      <Text style={{padding: 5}}>{profile?.about}</Text>
      <Divider />
      {events?.map(event => <Note key={event.id} note={event} />)}
    </BaseComponent>
  )
})