import React from "react";
import { Text } from "react-native-ui-lib";
import { BaseComponent } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";

type CreateLightningWalletScreenProps = NativeStackNavigationProp<OnboardParamList, "create-lightning-wallet">

export const CreateLightningWallet = () => {
  return (
    <BaseComponent>
      <Text>Create Lightning Wallet</Text>
    </BaseComponent>
  )
}