import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Divider, Layout, Text, TopNavigation } from "@ui-kitten/components";
import React from "react";
import { NostrParamList } from "src/navigation/NostrParamList";
import { BaseComponent } from "../../components/base-component";

type ProfileProps = NativeStackNavigationProp<NostrParamList, "nostr-profile">

export const Profile = () => {
  const navigation = useNavigation<ProfileProps>()

  return (
    <BaseComponent>
      <TopNavigation
        title='Profile'
        alignment='center'
      />
      <Divider />
      <Layout>
        <Text>Profile</Text>
      </Layout>
    </BaseComponent>
  )
}