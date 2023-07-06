import React from "react";
import { Text } from "react-native-ui-lib";
import { BaseComponent } from "../../components";
import { OnboardParamList } from "../../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NostrCreateAccountScreenProps = NativeStackNavigationProp<OnboardParamList, "nostr-create-account">

export const NostrCreateAccount = () => {
  return (
    <BaseComponent>
      <Text>Nostr Create Account</Text>
    </BaseComponent>
  )
}