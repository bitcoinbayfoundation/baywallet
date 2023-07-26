import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Colors, TouchableOpacity } from 'react-native-ui-lib';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
export const BackButton = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <MaterialIcon name="arrow-back-ios" color={Colors.text} size={20} />
    </TouchableOpacity>
  )
}