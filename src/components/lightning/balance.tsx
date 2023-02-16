import React from "react"
import { Layout, Text } from "@ui-kitten/components"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import { Pressable } from "react-native"
import { useDataStore } from "src/store/DataProvider"

 // TODO: Add symbol referenced by user preference.
export const Balance = observer(() => {
  const {lightningStore: {balance}, settingsStore: {settings}} = useDataStore()
  const [hideBalance, setHideBalance] = useState<boolean>(settings.hideBalance)

  useEffect(() => {
    setHideBalance(settings.hideBalance)
  }, [settings])
  
  return (
    <Pressable onPress={() => setHideBalance(!hideBalance)}>
      <Layout style={{display: "flex", alignItems: "center", flexDirection: "row"}}>
        {/* <Satoshi color="#ff0000" style={{marginTop: , marginRight: 10}}/> */}
        <Text style={{textAlign: 'center', paddingTop: '10%', fontSize: 50}}>{hideBalance ? "*********" : balance + " sats"}</Text>
      </Layout>
    </Pressable>
  )
})