import React from "react";
import { Text, View } from "react-native-ui-lib";
import { BaseComponent, Button } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

type CreateLightningWalletScreenProps = NativeStackNavigationProp<OnboardParamList, "create-lightning-wallet">

export const CreateLightningWallet = () => {
  const navigation = useNavigation<CreateLightningWalletScreenProps>()

  return (
    <BaseComponent>
      <View height="100%" style={styles.onboard}>
        <Text>Create Lightning Wallet</Text>
        <Button label="Continue" size="large" onPress={() => navigation.navigate("sup-stud")} />
      </View>
    </BaseComponent>
  )
}