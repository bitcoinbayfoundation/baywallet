import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Receive, Home, Scan, Invoice, Pay } from "../screens/lightning"
import { Settings, AdvancedSettings, Channels, NostrSettings } from "../screens/settings"
import { HomeFeed, Profile, Post } from "../screens/nostr"
import { BottomTabBar } from "./bottom-tab-bar"

export * from "./nav-params"

export const WalletNavigator = () => {
  const BayWalletStack = createNativeStackNavigator()
  return (
    <BayWalletStack.Navigator initialRouteName="home">
      <BayWalletStack.Screen options={{ headerShown: false }} name="home" component={Home} />
      <BayWalletStack.Screen options={{ headerShown: false }} name="receive" component={Receive} />
      <BayWalletStack.Screen options={{ headerShown: false }} name="scan" component={Scan} />
      <BayWalletStack.Screen options={{ headerShown: false }} name="invoice" component={Invoice} />
      <BayWalletStack.Screen options={{ headerShown: false }} name="pay" component={Pay} />
    </BayWalletStack.Navigator>
  )
}

export const SettingsNavigator = () => {
  const SettingsStack = createNativeStackNavigator()
  return (
    <SettingsStack.Navigator initialRouteName="settings-main">
      <SettingsStack.Screen options={{ headerShown: false }} name="settings-main" component={Settings} />
      <SettingsStack.Screen options={{ headerShown: false }} name="advanced-settings" component={AdvancedSettings} />
      <SettingsStack.Screen options={{ headerShown: false }} name="channels" component={Channels} />
      <SettingsStack.Screen options={{ headerShown: false }} name="nostr-settings" component={NostrSettings} />
    </SettingsStack.Navigator>
  )
}

export const NostrNavigator = () => {
  const NostrStack = createNativeStackNavigator()
  return (
    <NostrStack.Navigator>
      <NostrStack.Screen options={{ headerShown: false }} name="nostr-home-feed" component={HomeFeed} />
      <NostrStack.Screen options={{ headerShown: false }} name="nostr-profile" component={Profile} />
      <NostrStack.Screen options={{ headerShown: false }} name="nostr-post" component={Post} />
    </NostrStack.Navigator>
  )
}

export const BayWalletNavigator = () => {
  const { Navigator, Screen } = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Navigator tabBar={props => <BottomTabBar {...props} />} initialRouteName="baywallet">
        <Screen name='baywallet' options={{ headerShown: false }} component={WalletNavigator} />
        <Screen name='nostr' options={{ headerShown: false }} component={NostrNavigator} />
        <Screen name='settings' options={{ headerShown: false }} component={SettingsNavigator} />
      </Navigator>
    </NavigationContainer>
  )
};

