import React from 'react'
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { MediumText } from './text'
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet } from 'react-native'
import Clipboard from "@react-native-clipboard/clipboard"
import Toast from 'react-native-toast-message'

export const Copy = ({ content }) => {
  const copy = () => {
    Clipboard.setString(content)
    Toast.show({
      type: "success",
      text1: "Copied to clipboard",
    })
  }
  return (
    <TouchableOpacity backgroundColor={Colors.screenBG} style={styles.copy} onPress={() => copy()} row>
      <MediumText content={content} props={{ numberOfLines: 1 }} styles={{ width: "92%" }} />
      <CommunityIcon name="content-copy" size={20} color={Colors.text} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  copy: {
    borderWidth: 1,
    borderColor: Colors.grey30,
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 10,
    marginVertical: 5
  }
})