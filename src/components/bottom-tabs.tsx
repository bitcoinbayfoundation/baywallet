import React from "react"
import { useNavigation } from "@react-navigation/native"
import { Pressable, View, Text } from "react-native"

export const BottomTabs = () => {
  return (
    <View style={{position: "absolute", bottom: 0, width: "100%", height: "10%", backgroundColor: "#44ddff"}}>
      <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
        <Tab title="Home" />
        <Tab title="Settings" />
      </View>
    </View>
  )
}

const Tab = ({title}) => {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => console.log(title)}>
      <Text>{title}</Text>
    </Pressable>
  )
}