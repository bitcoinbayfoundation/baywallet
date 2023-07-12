import React, { useEffect, useState } from "react";
import { Text, View } from "react-native-ui-lib";
import { BaseComponent, Button, LargeText, Warning } from "../../components";
import { OnboardParamList } from "../../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { Copy } from "../../components/misc/copy";
import { useDataStore } from "../../store";
import { NostrKeys } from "../../types/nostr";
import { observer } from "mobx-react";

type NostrCreateAccountScreenProps = NativeStackNavigationProp<OnboardParamList, "nostr-create-account">

export const NostrCreateAccount = observer(() => {
  const navigation = useNavigation<NostrCreateAccountScreenProps>()
  const { nostrKeyStore } = useDataStore()
  const [newKeys, setNewKeys] = useState<NostrKeys>()

  useEffect(() => {
    const generateKeys = async () => {
      const keys = await nostrKeyStore.getKeysOrGenerate()
      setNewKeys(keys)
    }
    generateKeys()
  }, [])

  console.log("new keys to be stored", newKeys)

  return (
    <BaseComponent>
      <View height="100%" style={styles.onboard}>
        <View>
          <LargeText content="Create Your Nostr Account" styles={{ textAlign: "center", marginBottom: 20 }} />
          <Warning heading="Store Your Nostr Keys" content="Your private key is your identity on nostr. If you lose your private key, you will lose access to your account." />
          <Copy content={newKeys?.npub} />
          <Copy content={newKeys?.nsec} />
        </View>
        <Button label="Continue" size="large" onPress={() => {
          nostrKeyStore.saveNostrKeys(newKeys)
          navigation.navigate("nostr-profile-setup")
        }} />
      </View>
    </BaseComponent>
  )
})