import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, View, Avatar, Colors } from 'react-native-ui-lib';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SmallText } from './text';

export const PhotoUpload = ({ photo, handleUpload }) => {
  return !photo ? (
    <TouchableOpacity onPress={handleUpload} style={styles.upload} center>
      <CommunityIcon name="camera" size={25} color={Colors.text} />
      <SmallText content="Upload" />
      <View style={styles.pencil} center>
        <CommunityIcon name="pencil" size={15} color={Colors.black} />
      </View>
    </TouchableOpacity>
  ) : (
    <Avatar size={100} source={{ uri: photo }} />
  );
};

const styles = StyleSheet.create({
  upload: {
    backgroundColor: Colors.grey30,
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  pencil: {
    borderRadius: 100,
    width: 30,
    height: 30,
    position: 'absolute',
    right: 4,
    backgroundColor: Colors.text,
    bottom: 0,
  },
});
