import React from "react"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { observer } from "mobx-react"
import Home from "../screens/Home"

export const BayWalletNavigation = observer(() => {
  const BayWallet = createNativeStackNavigator()

  return (
    <BayWallet.Navigator initialRouteName="home">
      <BayWallet.Screen name="home" component={Home}/>
    </BayWallet.Navigator>
  )  
})