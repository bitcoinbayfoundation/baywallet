import React from "react"
import { Colors, LoaderScreen } from "react-native-ui-lib"

import { BaseComponent } from "./base-component"

// use memes shout out 
export const Loading = () => {
  return (
    <BaseComponent>
      <LoaderScreen backgroundColor={Colors.screenBG} color={Colors.primary} />
    </BaseComponent>
  )
}