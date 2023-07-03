import React from "react";
import { Text, TextProps as LibTextProps } from "react-native-ui-lib";

type TextProps = { content: string, styles?: any, props?: LibTextProps }
export const SmallText = ({ content, styles, props }: TextProps) => {
  return <Text style={styles} {...props} text90>{content}</Text>
}

export const MediumText = ({ content, styles, props }: TextProps) => {
  return <Text style={styles} {...props} text60>{content}</Text>
}

export const LargeText = ({ content, styles, props }: TextProps) => {
  return <Text style={styles} {...props} text40>{content}</Text>
}