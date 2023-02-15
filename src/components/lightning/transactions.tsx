import React from "react"
import { TInvoice } from "@synonymdev/react-native-ldk"
import { Layout, Text } from "@ui-kitten/components"

type TransactionProp = { transaction: TInvoice}
export const Transaction = ({transaction}: TransactionProp) => {
  return (
    <Layout style={{display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10}}>
      <Layout style={{display: "flex", flexDirection: "column"}}>
        <Text>{transaction.description}</Text>
      </Layout>
      <Layout style={{display: "flex", flexDirection: "column"}}>
        <Text>{transaction.amount_satoshis} sats</Text>
      </Layout>
    </Layout>
  )
}