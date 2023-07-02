import React from "react";
import { Text } from "react-native-ui-lib";

type TextProps = { content: string, styles?: any }
export const SmallText = ({ content, styles }: TextProps) => {
  return <Text style={styles} text90>{content}</Text>
}

export const MediumText = ({ content, styles }: TextProps) => {
  return <Text style={styles} text60>{content}</Text>
}

export const LargeText = ({ content, styles }: TextProps) => {
  return <Text style={styles} text40>{content}</Text>
}