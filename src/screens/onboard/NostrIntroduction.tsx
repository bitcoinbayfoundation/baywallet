import React from "react";
import { Text, View } from "react-native-ui-lib";
import { Button } from "../../components";
import { BaseComponent } from "../../components";
import { OnboardParamList } from "../../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles"

type NostrIntroductionScreenProps = NativeStackNavigationProp<OnboardParamList, "nostr-introduction">

export const NostrIntroduction = () => {
  const navigation = useNavigation<NostrIntroductionScreenProps>()

  return (
    <BaseComponent>
      <View height="100%" style={styles.onboard}>
        <Text>Nostr Introduction</Text>
        <View height={100} style={styles.buttons}>
          <Button label="Login with nsec" size="large" onPress={() => navigation.navigate("nostr-login")} />
          <Button label="Create New Account" size="large" onPress={() => navigation.navigate("nostr-create-account")} />
        </View>
      </View>
    </BaseComponent>
  )
}