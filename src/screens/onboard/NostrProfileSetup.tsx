import React from "react";
import { Text } from "react-native-ui-lib";
import { BaseComponent } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";

type NostrProfileSetupScreenProps = NativeStackNavigationProp<OnboardParamList, "nostr-profile-setup">

export const NostrProfileSetup = () => {
  return (
    <BaseComponent>
      <Text>Nostr Profile Setup</Text>
    </BaseComponent>
  )
}