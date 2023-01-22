import React from "react"
import { Provider } from "mobx-react"
import stores from "./store"
import { NavigationContainer } from "@react-navigation/native"
import { BaseComponent } from "./components/base-component"

export const BayWalletProvider = ({children}) => {
  return (
    <NavigationContainer>
      <Provider lightning={stores.lightningStore} account={stores.accountStore}>
        <BaseComponent>
          {children}
        </BaseComponent>
      </Provider>
    </NavigationContainer>
  )
}