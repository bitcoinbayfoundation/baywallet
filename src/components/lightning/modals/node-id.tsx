import React from "react"
import Clipboard from "@react-native-clipboard/clipboard"
import { Button, Text } from "@ui-kitten/components"
import { BaseModal } from "./base"
import Toast from "react-native-toast-message"

export const NodeId = ({data}) => {
  console.log(data)
  return (
    <BaseModal>
      <Text>Your pubkey:</Text>
      <Text lineBreakMode="clip" numberOfLines={1} style={{width: "90%", paddingVertical: 10}}>{data.nodeId}</Text>
      <Button style={{width: 100, marginHorizontal: 5}} onPress={() => { Clipboard.setString(data.nodeId); Toast.show({type: "success", text1: 'Copied to clipboard.'})}}>
        Copy
      </Button>
    </BaseModal>
  )
}