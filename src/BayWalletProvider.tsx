import React from "react"
import { Provider } from "mobx-react"
import stores from "./store"
import { NavigationContainer } from "@react-navigation/native"
import { BaseComponent } from "./components/base-component"
import { ApplicationProvider } from "@ui-kitten/components"
import * as eva from "@eva-design/eva"

export const BayWalletProvider = ({children}) => {
  return (
    <NavigationContainer>
      <Provider lightning={stores.lightningStore} account={stores.accountStore}>
        <ApplicationProvider {...eva} theme={eva.dark}>
          {children}
        </ApplicationProvider>
      </Provider>
    </NavigationContainer>
  )
}