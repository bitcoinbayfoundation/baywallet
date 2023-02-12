import { Layout, Spinner } from "@ui-kitten/components"
import React from "react"
import { BaseComponent } from "./base-component"

export const Loading = () => {
  return (
    <BaseComponent>
      <Layout style={{display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
        <Spinner size="giant" />
      </Layout>
    </BaseComponent>
  )
}