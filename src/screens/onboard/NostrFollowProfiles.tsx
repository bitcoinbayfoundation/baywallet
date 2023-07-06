import React from "react";
import { Text } from "react-native-ui-lib";
import { BaseComponent } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";

type NostrFollowProfilesScreenProps = NativeStackNavigationProp<OnboardParamList, "nostr-follow-profiles">

export const NostrFollowProfiles = () => {
  return (
    <BaseComponent>
      <Text>Nostr Follow Profiles</Text>
    </BaseComponent>
  )
}