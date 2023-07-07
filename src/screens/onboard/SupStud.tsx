import React from "react";
import { Text, View } from "react-native-ui-lib";
import { BaseComponent, Button } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

type SupStudScreenProps = NativeStackNavigationProp<OnboardParamList, "sup-stud">

export const SupStud = () => {
  const navigation = useNavigation<SupStudScreenProps>()
  return (
    <BaseComponent>
      <View height="100%" style={styles.onboard}>
        <Text>Sup Stud</Text>
        <Button label="Enter Bay Wallet!" size="large" onPress={() => console.log("all done!")} />
      </View>
    </BaseComponent>
  )
}