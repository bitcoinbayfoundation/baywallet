import React from "react";
import { Text } from "react-native-ui-lib";
import { BaseComponent } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";

type NostrLoginScreenProps = NativeStackNavigationProp<OnboardParamList, "nostr-login">

export const NostrLogin = () => {
  return (
    <BaseComponent>
      <Text>Nostr Login</Text>
    </BaseComponent>
  )
} 