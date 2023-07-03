import React from "react";
import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BaseComponent } from "../../components";
import { LightningParamList } from "../../navigation";
import { LargeText } from "../../components";

type PayScreenProps = NativeStackScreenProps<LightningParamList, "pay">

type Props = {
  route?: RouteProp<LightningParamList, "pay">
}

export const Pay = (props: Props) => {
  return (
    <BaseComponent>
      <LargeText content={"NOT IMPLEMENTED"} />
    </BaseComponent>
  )
}