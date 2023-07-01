import React from "react";
import { StyleSheet } from "react-native";
import { Button as LibButton } from "react-native-ui-lib"
import { Colors } from "react-native-ui-lib"

type ButtonProps = {
  label: string;
  onPress: () => void;
  style?: any;
}

export const Button = ({ label, onPress }: ButtonProps) => {
  return <LibButton label={label} style={styles.button} onPress={onPress} color={Colors.text} />;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 125
  }
})