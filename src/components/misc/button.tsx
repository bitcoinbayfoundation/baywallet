import React from "react";
import { StyleSheet } from "react-native";
import { Button as LibButton } from "react-native-ui-lib"
import { Colors } from "react-native-ui-lib"

type ButtonProps = {
  label: string;
  onPress: () => void;
  style?: any;
  size: "large" | "medium" | "small" | "xSmall"
  inverted?: boolean;
  disabled?: boolean;
}

export const Button = ({ label, onPress, size, disabled, inverted = false }: ButtonProps) => {
  return <LibButton label={label} size={size} style={styles.button} disabled={disabled} disabledBackgroundColor={Colors.grey30} backgroundColor={!inverted ? Colors.primary : Colors.screenBG} onPress={onPress} color={Colors.text} />;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    marginHorizontal: 10,
  }
})