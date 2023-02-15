import React from "react"
import Home from "../screens/Home"
import { Receive } from "../screens/Receive"
import { Scan } from "../screens/Scan"
import { Settings } from "../screens/settings/Settings"
import { Invoice } from "../screens/Invoice"
import { Pay } from "../screens/Pay"
import { BottomNavigation, BottomNavigationTab, Icon, Text } from "@ui-kitten/components"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { AdvancedSettings } from "../screens/settings/AdvancedSettings"
import { HomeFeed } from "../screens/nostr/HomeFeed"
import { Profile } from "../screens/nostr/Profile"
import { Channels } from "../screens/settings/Channels"


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

export const SettingsNavigator = () => {
  const SettingsStack = createNativeStackNavigator()
  return (
    <SettingsStack.Navigator initialRouteName="settings">
      <SettingsStack.Screen options={{headerShown: false}} name="settings" component={Settings} />
      <SettingsStack.Screen options={{headerShown: false}} name="advanced-settings" component={AdvancedSettings} />
      <SettingsStack.Screen options={{headerShown: false}} name="channels" component={Channels} />
    </SettingsStack.Navigator>
  )
}

export const NostrNavigator = () => {
  const NostrStack = createNativeStackNavigator()
  return (
    <NostrStack.Navigator>
      <NostrStack.Screen options={{headerShown: false}} name="nostr-home-feed" component={HomeFeed} />
      <NostrStack.Screen options={{headerShown: false}} name="nostr-profile" component={Profile} />
    </NostrStack.Navigator>
  )
}


const BottomTabBar = ({ navigation, state }) => {
  // const {lightningStore: {balance}} = useDataStore()
  return (
    <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
      {/* <BottomNavigationTab title={evaProps => <Text {...evaProps} style={{fontSize: 20}}>${balance}</Text>}/> */}
      <BottomNavigationTab icon={<Icon name="flash-outline" />}/>
      <BottomNavigationTab icon={<Icon name="radio-outline" />} />
      <BottomNavigationTab icon={<Icon name="settings-outline" />}/>
    </BottomNavigation>
)};

export const BayWalletNavigator = () => {
  const { Navigator, Screen } = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name='baywallet' options={{headerShown:false}} component={BayWalletAppNavigator} />
        <Screen name='nostr' options={{headerShown:false}} component={NostrNavigator} />
        <Screen name='baywallet-settings' options={{headerShown:false}} component={SettingsNavigator} />
      </Navigator>
    </NavigationContainer>
  )
};

