import React from "react"
import { Colors, View } from "react-native-ui-lib"
import { MediumText } from "../misc"
import { StyleSheet } from "react-native"

export const Mnemonic = ({ mnemonic }) => {
  const mnemonicArray = mnemonic.split(" ")
  return (
    <View style={styles.mnemonic} flex row>
      {mnemonicArray.map((word, index) => {
        return (
          <View key={`${word}-${index}`} style={styles.word} row center>
            <MediumText content={index + 1 + "."} />
            <MediumText content={word} />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  mnemonic: {
    flexWrap: "wrap"
  },
  word: {
    margin: 3,
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 5,
    width: 122,
    justifyContent: "space-between",
    backgroundColor: Colors.grey10,
    borderRadius: 5
  }
})