import React from "react";
import { Text } from "react-native-ui-lib";
import { BaseComponent } from "../../components";
import { OnboardParamList } from "../../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NostrIntroductionScreenProps = NativeStackNavigationProp<OnboardParamList, "nostr-introduction">

export const NostrIntroduction = () => {
  return (
    <BaseComponent>
      <Text>Nostr Introduction</Text>
    </BaseComponent>
  )
}