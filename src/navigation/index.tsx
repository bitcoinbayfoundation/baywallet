import React from "react"
import Home from "../screens/Home"
import { Receive } from "../screens/Receive"
import { Send } from "../screens/Send"
import { Settings } from "../screens/Settings"
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const BayWalletStack = createNativeStackNavigator()

export const BayWalletAppNavigator = () => {
  return (
    <BayWalletStack.Navigator initialRouteName="home">
      <BayWalletStack.Screen options={{headerShown: false}} name="home" component={Home} />
      <BayWalletStack.Screen options={{headerShown: false}} name="receive" component={Receive} />
      <BayWalletStack.Screen options={{headerShown: false}} name="send" component={Send} />
    </BayWalletStack.Navigator>
  )
}

const { Navigator, Screen } = createBottomTabNavigator()

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Home'/>
    <BottomNavigationTab title='Settings'/>
  </BottomNavigation>
);

export const BayWalletNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='baywallet' component={BayWalletAppNavigator}/>
    <Screen name='settings' component={Settings}/>
  </Navigator>
);

