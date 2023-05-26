import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Divider, Layout, Text, TopNavigation } from "@ui-kitten/components";
import React from "react";
import { NostrParamList } from "../../navigation/NostrParamList";
import { useDataStore } from "../../store/DataProvider";
import { BaseComponent } from "../../components/base-component";
import { observer } from "mobx-react";
import { useProfile } from "../../nostr/useProfile";
import { Loading } from "../../components/loading";

type ProfileProps = NativeStackNavigationProp<NostrParamList, "nostr-profile">

export const Profile = observer(() => {
  const navigation = useNavigation<ProfileProps>()
  // const { nostrStore, nostrStore: {me} } = useDataStore()

  // useEffect(() => {
  //   nostrStore.getMe()
  // }, [])
  const { data: profile } = useProfile({
    pubkey: "3f194d7cf5c59eca0145ed7804f0a67c0cc17b6ff6b4bd585821160dcf9d785b"
  })

  return (
    <BaseComponent>
      <TopNavigation
        title='Profile'
        alignment='center'
      />
      <Divider />
      <Layout>
        <Text>{JSON.stringify(profile)}</Text>
      </Layout>
    </BaseComponent>
  )
})