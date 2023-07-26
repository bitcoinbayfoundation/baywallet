import React from "react"
import { NativeStackNavigationOptions } from "@react-navigation/native-stack"
import { Colors } from "react-native-ui-lib"
import { BackButton } from "./back-button"

export const screenHeaderOptions = (title: string, headerRight?: React.ReactNode): NativeStackNavigationOptions => ({
  headerShown: true,
  title: title,
  headerTitleAlign: "center",
  headerTitleStyle: {
    color: Colors.text
  },
  headerStyle: {
    backgroundColor: Colors.screenBG,
  },
  headerLeft: () => title === "Home" || title === "Wallet" || title === "Settings" ? <></> : <BackButton />,
  headerRight: () => headerRight
})
