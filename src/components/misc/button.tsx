import React from "react";
import { StyleSheet } from "react-native";
import { Button as LibButton } from "react-native-ui-lib"
import { Colors, ButtonProps as LibButtonProps } from "react-native-ui-lib"

type ButtonProps = {
  label: string;
  onPress: () => void;
  style?: any;
  size?: "large" | "medium" | "small" | "xSmall"
  inverted?: boolean;
  disabled?: boolean;
  props?: LibButtonProps
}

export const Button = ({ label, onPress, size, style, disabled, inverted = false, props }: ButtonProps) => {
  return <LibButton {...props} label={label} size={size} style={styles(style).button} disabled={disabled} disabledBackgroundColor={Colors.grey30} backgroundColor={!inverted ? Colors.primary : Colors.screenBG} onPress={onPress} color={Colors.text} />;
}

const styles = (style?: any) => StyleSheet.create({
  button: {
    ...style,
    borderRadius: 10,
    marginHorizontal: 10,
  }
})