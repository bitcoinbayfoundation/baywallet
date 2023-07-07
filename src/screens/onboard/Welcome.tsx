import React from "react";
import { Colors, Text, View } from "react-native-ui-lib";
import { BaseComponent, Button } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { styles } from "./styles"

type WelcomeScreenProps = NativeStackNavigationProp<OnboardParamList, "welcome">

export const Welcome = () => {
  const navigation = useNavigation<WelcomeScreenProps>()

  return (
    <BaseComponent>
      <View style={styles.onboard} height="100%">
        <Text>Cool welcome animation</Text>
        <Button label="Get Started" size="large" style={{ paddingHorizontal: 100 }} onPress={() => navigation.navigate("nostr-introduction")} />
      </View>
    </BaseComponent>
  )
}