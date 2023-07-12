import React from "react";
import { View } from "react-native-ui-lib";
import { BaseComponent, Button, LargeText, Warning } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { useLightningSeed } from "../../hooks";
import { Mnemonic } from "../../components/lightning/mnemonic";
import { StyleSheet } from "react-native";

type CreateLightningWalletScreenProps = NativeStackNavigationProp<OnboardParamList, "create-lightning-wallet">

export const CreateLightningWallet = () => {
  const navigation = useNavigation<CreateLightningWalletScreenProps>()
  const { mnemonic, saveKeys } = useLightningSeed()

  return (
    <BaseComponent>
      <View height="100%" width="100%" style={styles.seed}>
        <LargeText content="Your Seed Phrase" styles={{ textAlign: "center" }} />
        <Warning heading="Store this securely!" content="Your seed phrase is the only backup for your funds. Missplacing your seed will result in a loss of funds." />
        <Mnemonic mnemonic={mnemonic} />
        <Button label="Continue" size="large" onPress={async () => {
          const save = await saveKeys()
          if (!save) return
          navigation.navigate("sup-stud")
        }} />
      </View>
    </BaseComponent>
  )
}

const styles = StyleSheet.create({
  seed: {
    justifyContent: "space-between",
    paddingTop: 75,
    textAlign: "center",
  }
})