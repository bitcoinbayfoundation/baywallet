import React from "react"
import Home from "../screens/Home"
import { Receive } from "../screens/Receive"
import { Send } from "../screens/Send"
import { Settings } from "../screens/Settings"
import { Invoice } from "../screens/Invoice"
import { BottomNavigation, BottomNavigationTab, Icon, Text } from "@ui-kitten/components"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import stores from "../store"
import { NavigationContainer } from "@react-navigation/native"


export const BayWalletAppNavigator = () => {
  const BayWalletStack = createNativeStackNavigator()
  return (
    <BayWalletStack.Navigator initialRouteName="home">
      <BayWalletStack.Screen options={{headerShown: false}} name="home" component={Home} />
      <BayWalletStack.Screen options={{headerShown: false}} name="receive" component={Receive} />
      <BayWalletStack.Screen options={{headerShown: false}} name="send" component={Send} />
      <BayWalletStack.Screen options={{headerShown: false}} name="invoice" component={Invoice} />
    </BayWalletStack.Navigator>
  )
}


const BottomTabBar = ({ navigation, state }) => {
  const {balance} = stores.lightningStore
  return (
    <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title={evaProps => <Text {...evaProps} style={{fontSize: 20}}>${balance}</Text>}/>
      <BottomNavigationTab icon={<Icon name="settings-outline" />}/>
    </BottomNavigation>
)};

export const BayWalletNavigator = () => {
  const { Navigator, Screen } = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name='baywallet' options={{headerShown:false}} component={BayWalletAppNavigator}/>
        <Screen name='settings' options={{headerShown:false}} component={Settings}/>
      </Navigator>
    </NavigationContainer>
  )
};

