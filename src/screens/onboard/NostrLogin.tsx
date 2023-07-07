import React, { useState } from "react";
import { Text, TextField, View } from "react-native-ui-lib";
import { BaseComponent, Button, LargeText } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles"

type NostrLoginScreenProps = NativeStackNavigationProp<OnboardParamList, "nostr-login">

export const NostrLogin = () => {
  const navigation = useNavigation<NostrLoginScreenProps>()
  const [nsec, setNsec] = useState<any>("")

  return (
    <BaseComponent>
      <View height="100%" style={styles.onboard}>
        <View>
          <LargeText content="Login with nsec" styles={{ textAlign: "center", marginBottom: 20 }} />
          <TextField
            style={styles.input}
            placeholder='nsec...'
            placeholderTextColor="#444"
            autoFocus={true}
            value={nsec}
            onChange={change => setNsec(change.nativeEvent.text)}
          />
        </View>
        <Button label="Login" size="large" onPress={() => navigation.navigate("verify-nostr-profile", { privatekey: "benjamin" })} />
      </View>
    </BaseComponent>
  )
}