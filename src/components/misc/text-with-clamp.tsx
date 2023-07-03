import React from 'react';
import { LayoutChangeEvent, Text as NativeText } from 'react-native';
import { Text, TextProps } from 'react-native-ui-lib';

type TextWithClampProps = {
  numberOfLines: number | undefined;
  onLayout?: (event: LayoutChangeEvent) => void;
  children: React.ReactNode | string;
  styles?: { [key: string]: string | number };
  ui?: TextProps;
};

export const TextWithClamp = ({
  numberOfLines,
  onLayout,
  children,
  styles,
  ui,
}: TextWithClampProps) => {
  return (
    <NativeText numberOfLines={numberOfLines} onLayout={onLayout}>
      <Text style={styles} {...ui}>
        {children}
      </Text>
    </NativeText>
  );
};
