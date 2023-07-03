require('react-native-ui-lib/config').setConfig({ appScheme: 'dark' });
import React from "react"
import { BaseComponent } from "./components/"
import { DataStoreProvider } from "./store/DataProvider"
import { StatusBar } from "react-native"
import Toast, { BaseToast } from "react-native-toast-message"
import { Colors } from "react-native-ui-lib"

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#01065A", top: 2 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
}
export const BayWalletProvider = ({ children }) => {
  return (
    <BaseComponent>
      <DataStoreProvider>
        <StatusBar barStyle="light-content" />
        {children}
        <Toast config={toastConfig} />
      </DataStoreProvider>
    </BaseComponent>
  )
}

/**
 * Theming
 */
Colors.loadColors({
  error: "#FF391A",
  success: "#1AFF57",
  primary: "#FF581A",
  backgroundLight: "#FFFFFF",
  backgroundDark: "#000000",
})

Colors.loadSchemes({
  light: {
    primary: Colors.primary,
    screenBG: Colors.backgroundLight,
    text: Colors.black,
    button: Colors.primary
  },
  dark: {
    primary: Colors.primary,
    screenBG: Colors.backgroundDark,
    text: Colors.white,
    button: Colors.primary
  }
})