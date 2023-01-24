import React from "react"
import { Provider } from "mobx-react"
import stores from "./store"
import { NavigationContainer } from "@react-navigation/native"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import * as eva from "@eva-design/eva"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import { BaseComponent } from "./components/base-component"

export const BayWalletProvider = ({children}) => {
  return (
    <NavigationContainer>
      <Provider lightning={stores.lightningStore} account={stores.accountStore}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
          <BaseComponent>
            {children}
          </BaseComponent>
        </ApplicationProvider>
      </Provider>
    </NavigationContainer>
  )
}