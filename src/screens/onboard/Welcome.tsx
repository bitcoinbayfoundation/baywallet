import React from "react";
import { Text } from "react-native-ui-lib";
import { BaseComponent } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";

type WelcomeScreenProps = NativeStackNavigationProp<OnboardParamList, "welcome">

export const Welcome = () => {
  return (
    <BaseComponent>
      <Text>Welcome!</Text>
    </BaseComponent>
  )
}