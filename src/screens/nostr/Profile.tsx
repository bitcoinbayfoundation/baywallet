import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Divider, Layout, Text, TopNavigation } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { NostrParamList } from "../../navigation/NostrParamList";
import { useDataStore } from "../../store/DataProvider";
import { BaseComponent } from "../../components/base-component";
import { observer } from "mobx-react";

type ProfileProps = NativeStackNavigationProp<NostrParamList, "nostr-profile">

export const Profile = observer(() => {
  const navigation = useNavigation<ProfileProps>()
  const { nostrStore, nostrStore: {me} } = useDataStore()

  useEffect(() => {
    nostrStore.getMe()
  }, [])

  return (
    <BaseComponent>
      <TopNavigation
        title='Profile'
        alignment='center'
      />
      <Divider />
      <Layout>
        <Text>{JSON.stringify(me)}</Text>
      </Layout>
    </BaseComponent>
  )
})