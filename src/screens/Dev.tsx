import React from "react";
import Realm from "realm";
import { View } from "react-native-ui-lib";
import { BaseComponent, Button, LargeText, Warning } from "../components";
import { StyleSheet } from "react-native";
import { useObject, useQuery, useRealm } from "@realm/react";
import { Note } from "../../db/schemas/Note";

// type CreateLightningWalletScreenProps = NativeStackNavigationProp<OnboardParamList, "create-lightning-wallet">

export const Dev = () => {
  // Query all notes
  const notes = useQuery(Note)
  // Query a single note by primary key (id for notes)
  const query = useObject(Note, "qwebfuerbvbqeorove")

  return (
    <BaseComponent>
      <View height="100%" width="100%" style={styles.seed}>
        <LargeText content="Dev" styles={{ textAlign: "center" }} />
        <Button size="large" label="Dev" onPress={() => { }} />
      </View>
    </BaseComponent>
  )
}

const styles = StyleSheet.create({
  seed: {
    justifyContent: "space-between",
    paddingTop: 75,
    textAlign: "center",
  }
})