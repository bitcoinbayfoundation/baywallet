import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { BaseComponent } from "../components/base-component";
import { NavParamList } from "../navigation/NavParamList";
import { Text } from "@ui-kitten/components";

type PayScreenProps = NativeStackScreenProps<NavParamList, "pay">

type Props = {
  route?: RouteProp<NavParamList, "pay">
}

export const Pay = (props: Props) => {
  return (
    <BaseComponent>
      <Text>hey</Text>
    </BaseComponent>
  )
}