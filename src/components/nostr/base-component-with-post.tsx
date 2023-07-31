import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseComponent } from '../layout';
import { Button, Colors } from 'react-native-ui-lib';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const BaseComponentWithPost = ({ children, navigation }) => {
  return (
    <>
      <BaseComponent>{children}</BaseComponent>
      <Button
        style={styles.post}
        backgroundColor={Colors.primary}
        onPress={() => navigation.navigate('nostr-post-create')}
        round>
        <CommunityIcon name="plus" color="white" size={25} />
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  post: {
    position: 'absolute',
    right: 30,
    bottom: 90,
    width: 50,
    color: Colors.text,
  },
});
