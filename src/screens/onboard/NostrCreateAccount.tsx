import React from "react";
import { Text, View } from "react-native-ui-lib";
import { BaseComponent, Button } from "../../components";
import { OnboardParamList } from "../../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

type NostrCreateAccountScreenProps = NativeStackNavigationProp<OnboardParamList, "nostr-create-account">

export const NostrCreateAccount = () => {
  const navigation = useNavigation<NostrCreateAccountScreenProps>()

  return (
    <BaseComponent>
      <View height="100%" style={styles.onboard}>
        <Text>Nostr Create Account</Text>
        <Button label="Continue" size="large" onPress={() => navigation.navigate("nostr-profile-setup")} />
      </View>
    </BaseComponent>
  )
}