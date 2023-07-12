import React from "react"
import { StyleSheet } from "react-native"
import { Colors, View } from "react-native-ui-lib"
import { MediumText, SmallText } from "./text"
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"

export const Warning = ({ heading, content }) => {
  return (
    <View style={styles.warning} row centerV>
      <View width={35} height={35} style={styles.exclamation} center>
        <CommunityIcon name="exclamation-thick" size={20} color={Colors.black} />
      </View>
      <View>
        <MediumText content={heading} props={{ color: Colors.grey10 }} />
        <SmallText content={content} props={{ color: Colors.grey10 }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  warning: {
    backgroundColor: "#cd853f",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#aa6a2c",
    paddingHorizontal: 10,
    paddingVertical: 15,
    margin: 10
  },
  exclamation: {
    borderRadius: 100,
    backgroundColor: "#aa6a2c",
    marginRight: 10
  }
})