import React from "react";
import { Text } from "react-native-ui-lib";
import { BaseComponent } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";

type SupStudScreenProps = NativeStackNavigationProp<OnboardParamList, "sup-stud">

export const SupStud = () => {
  return (
    <BaseComponent>
      <Text>Sup Stud</Text>
    </BaseComponent>
  )
}