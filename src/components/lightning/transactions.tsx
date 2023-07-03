import React from "react"
import { TInvoice } from "@synonymdev/react-native-ldk"
import { View, Text } from "react-native-ui-lib"
import { StyleSheet } from "react-native"

type TransactionProp = { transaction: TInvoice }
export const Transaction = ({ transaction }: TransactionProp) => {
  return (
    <View style={styles.container} row>
      <View>
        <Text>{transaction.description}</Text>
      </View>
      <View>
        <Text>{transaction.amount_satoshis} sats</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
  }
})