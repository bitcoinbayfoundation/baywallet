import React from "react"
import Home from "../screens/Home"
import { Settings } from "../screens/Settings"
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

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
    <Screen name='Users' component={Home}/>
    <Screen name='Orders' component={Settings}/>
  </Navigator>
);