import React from "react";
import { Text, View } from "react-native-ui-lib";
import { BaseComponent, Button } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";
import { styles } from "./styles";
import { useDataStore } from "../../store";
import { observer } from "mobx-react";

// type SupStudScreenProps = NativeStackNavigationProp<OnboardParamList, "sup-stud">

export const SupStud = observer(() => {
  const { onboardingStore } = useDataStore()
  return (
    <BaseComponent>
      <View height="100%" style={styles.onboard}>
        <Text>Sup Stud</Text>
        <Button label="Enter Bay Wallet!" size="large" onPress={() => onboardingStore.checkOnboarded()} />
      </View>
    </BaseComponent>
  )
})