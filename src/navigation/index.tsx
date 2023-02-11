import React from "react"
import Home from "../screens/Home"
import { Receive } from "../screens/Receive"
import { Scan } from "../screens/Scan"
import { Settings } from "../screens/Settings"
import { Invoice } from "../screens/Invoice"
import { Pay } from "../screens/Pay"
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
      <BayWalletStack.Screen options={{headerShown: false}} name="scan" component={Scan} />
      <BayWalletStack.Screen options={{headerShown: false}} name="invoice" component={Invoice} />
      <BayWalletStack.Screen options={{headerShown: false}} name="pay" component={Pay} />
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

