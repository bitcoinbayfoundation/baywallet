import React from "react";
import { StyleSheet } from "react-native";
import { Button as LibButton } from "react-native-ui-lib"
import { Colors } from "react-native-ui-lib"

type ButtonProps = {
  label: string;
  onPress: () => void;
  style?: any;
  size: "large" | "medium" | "small" | "xSmall"
}

export const Button = ({ label, onPress, size }: ButtonProps) => {
  return <LibButton label={label} size={size} style={styles.button} onPress={onPress} color={Colors.text} />;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginHorizontal: 10,
  }
})