import React from "react"
import { Provider } from "mobx-react"
import stores from "./store"
import { NavigationContainer } from "@react-navigation/native"

export const BayWalletProvider = ({children}) => {
  return (
    <NavigationContainer>
      <Provider lightning={stores.lightningStore} account={stores.accountStore}>
        {children}
      </Provider>
    </NavigationContainer>
  )
}