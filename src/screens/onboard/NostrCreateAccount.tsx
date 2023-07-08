import React from "react";
import { Text, View } from "react-native-ui-lib";
import { BaseComponent, Button, LargeText, Warning } from "../../components";
import { OnboardParamList } from "../../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { Copy } from "../../components/misc/copy";
import { useNostrKeys } from "../../hooks";

type NostrCreateAccountScreenProps = NativeStackNavigationProp<OnboardParamList, "nostr-create-account">

export const NostrCreateAccount = () => {
  const navigation = useNavigation<NostrCreateAccountScreenProps>()
  const { nostrKeys, saveKeys } = useNostrKeys()
  return (
    <BaseComponent>
      <View height="100%" style={styles.onboard}>
        <View>
          <LargeText content="Create Your Nostr Account" styles={{ textAlign: "center", marginBottom: 20 }} />
          <Warning heading="Store Your Nostr Keys" content="Your private key is your identity on nostr. If you lose your private key, you will lose access to your account." />
          <Copy content={nostrKeys?.npub} />
          <Copy content={nostrKeys?.nsec} />
        </View>
        <Button label="Continue" size="large" onPress={() => {
          saveKeys()
          navigation.navigate("nostr-profile-setup")
        }} />
      </View>
    </BaseComponent>
  )
}