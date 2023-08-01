import React, { useCallback } from 'react';
import { StyleSheet, Linking, Pressable } from 'react-native';
import Toast from 'react-native-toast-message';
import { Colors, View, Text } from 'react-native-ui-lib';
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"

export const PostLink = ({ link }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(link);

    if (!supported) return Toast.show({ type: 'error', text1: 'Cannot open link.' });

    await Linking.openURL(link);

  }, [link]);

  return (
    <Pressable style={styles.link} onPress={async () => await handlePress()}>
      <Text numberOfLines={1}>
        <View style={styles.icon}>
          <CommunityIcon name="link-variant" size={15} color={Colors.text} />
        </View>
        {link}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  link: {
    borderRadius: 100,
    backgroundColor: Colors.grey10,
    color: Colors.text,
    marginTop: 10,
    padding: 5,
    display: "flex",
    alignItems: "center"
  },
  icon: {
    padding: 0,
    marginLeft: 2,
    marginRight: 3,
  }
})