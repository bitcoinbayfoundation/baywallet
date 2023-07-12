import { StyleSheet } from "react-native"
import { Colors } from "react-native-ui-lib"

export const styles = StyleSheet.create({
  onboard: {
    justifyContent: "space-between",
    paddingTop: 150,
    textAlign: "center",
  },
  buttons: {
    justifyContent: "space-between",
  },
  input: {
    fontSize: 25,
    width: "100%",
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: Colors.grey30,
    borderRadius: 10,
  },
  inputLabel: {
    marginTop: 10
  }
})