import React from "react";
import { SafeAreaView, View } from "react-native";

export const BaseComponent = ({children}) => {
  return (
    <SafeAreaView>
      <View style={{ margin: 0, padding: 0, height: "100%", width: "100%"}}>
        {children}
      </View>
    </SafeAreaView>
  )
}