import React from "react"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import * as eva from "@eva-design/eva"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import { BaseComponent } from "./components/base-component"
import { default as mapping } from "../mapping.json"
import { colors } from "../theme"
import { DataStoreProvider } from "./store/DataProvider"
import { StatusBar } from "react-native"

export const BayWalletProvider = ({children}) => {
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
      {/*// @ts-ignore */}
      <ApplicationProvider {...eva} theme={{...eva.dark, ...colors}} customMapping={mapping}>
        <BaseComponent>
          <DataStoreProvider>
            <StatusBar barStyle="light-content" />
            {children}
          </DataStoreProvider>
        </BaseComponent>
      </ApplicationProvider>
    </>
  )
}