import React from "react";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { BaseComponent, Button, SmallText } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

type LightningIntroductionScreenProps = NativeStackNavigationProp<OnboardParamList, "lightning-introduction">

export const LightningIntroduction = () => {
  const navigation = useNavigation<LightningIntroductionScreenProps>()

  return (
    <BaseComponent>
      <View height="100%" style={styles.onboard}>
        <Text>Lightning Introduction</Text>
        <View>
          <Button label="Continue" size="large" onPress={() => navigation.navigate("create-lightning-wallet")} />
          <TouchableOpacity onPress={() => navigation.navigate("sup-stud")}>
            <SmallText content="Skip creating a lightning wallet for right now." styles={{ color: Colors.grey30, textAlign: "center", paddingVertical: 15 }} />
          </TouchableOpacity>
        </View>
      </View>
    </BaseComponent>
  )
}