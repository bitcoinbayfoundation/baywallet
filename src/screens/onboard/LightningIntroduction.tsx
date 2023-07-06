import React from "react";
import { Text } from "react-native-ui-lib";
import { BaseComponent } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";

type LightningIntroductionScreenProps = NativeStackNavigationProp<OnboardParamList, "lightning-introduction">

export const LightningIntroduction = () => {
  return (
    <BaseComponent>
      <Text>Lightning Introduction</Text>
    </BaseComponent>
  )
}