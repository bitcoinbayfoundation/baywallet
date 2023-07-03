import React from "react"
import { View, Text, Colors } from "react-native-ui-lib"
import { observer } from "mobx-react"
import { useState } from "react"
import { Pressable, StyleSheet } from "react-native"
import { useDataStore } from "../../store/DataProvider"

// TODO: Add symbol referenced by user preference.
export const Balance = observer(() => {
  const { lightningStore: { balance }, settingsStore: { settings } } = useDataStore()
  const [hideBalance, setHideBalance] = useState<boolean>(settings?.hideBalance ?? false)

  return (
    <Pressable onPress={() => setHideBalance(!hideBalance)}>
      <View row center>
        {/* <Satoshi color="#ff0000" style={{ marginTop: , marginRight: 10 }} /> */}
        <Text style={styles.balance} color={Colors.text} center>{hideBalance ? "*********" : balance?.toLocaleString() + " sats"}</Text>
      </View>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  balance: {
    fontSize: 50,
    paddingTop: "30%"
  }
})