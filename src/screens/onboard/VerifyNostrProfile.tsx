import React from "react";
import { Text, View } from "react-native-ui-lib";
import { BaseComponent, Button, LargeText } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { VerifyProfile } from "../../components/nostr";

type VerifyNostrProfileScreenProps = NativeStackNavigationProp<OnboardParamList, "verify-nostr-profile">

export const VerifyNostrProfile = () => {
  const navigation = useNavigation<VerifyNostrProfileScreenProps>()

  return (
    <BaseComponent>
      <View height="100%" style={styles.onboard}>
        <View centerH>
          <LargeText content="Is this you?" styles={{ marginBottom: 20 }} />
          <VerifyProfile pubkey="3f194d7cf5c59eca0145ed7804f0a67c0cc17b6ff6b4bd585821160dcf9d785b" />
        </View>
        <View height={100} style={styles.buttons}>
          <Button label="Yes!" size="large" onPress={() => navigation.navigate("lightning-introduction")} />
          <Button label="Nope" size="large" onPress={() => navigation.navigate("nostr-login")} inverted />
        </View>
      </View>
    </BaseComponent>
  )
}