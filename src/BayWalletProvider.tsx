import React from "react"
import { BaseComponent } from "./components/"
import { DataStoreProvider } from "./store/DataProvider"
import { StatusBar } from "react-native"
import Toast, { BaseToast } from "react-native-toast-message"

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