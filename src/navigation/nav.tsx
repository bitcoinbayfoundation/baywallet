import React from "react"
import { screenHeaderOptions } from "./header"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CreateInvoice, Wallet, Scan, Receive, Pay } from "../screens/lightning"
import { Settings, LightningSettings, Channels, NostrSettings } from "../screens/settings"
import { HomeFeed, Profile, PostView, PostCreate } from "../screens/nostr"
import { Welcome, NostrIntroduction, NostrLogin, NostrCreateAccount, NostrProfileSetup, NostrFollowProfiles, LightningIntroduction, CreateLightningWallet, SupStud, VerifyNostrProfile } from "../screens/onboard"
import { BottomTabBar } from "./bottom-tab-bar"
/* Dev only */
import { Dev } from "../screens/Dev"

export const WalletNavigator = () => {
  const BayWalletStack = createNativeStackNavigator()
  return (
    <BayWalletStack.Navigator initialRouteName="wallet">
      <BayWalletStack.Screen options={screenHeaderOptions("Wallet")} name="wallet" component={Wallet} />
      <BayWalletStack.Screen options={screenHeaderOptions("Receive")} name="receive" component={Receive} />
      <BayWalletStack.Screen options={screenHeaderOptions("Send")} name="scan" component={Scan} />
      <BayWalletStack.Screen options={screenHeaderOptions("Create Invoice")} name="create-invoice" component={CreateInvoice} />
      <BayWalletStack.Screen options={screenHeaderOptions("Pay")} name="pay" component={Pay} />
    </BayWalletStack.Navigator>
  )
}

export const SettingsNavigator = () => {
  const SettingsStack = createNativeStackNavigator()
  return (
    <SettingsStack.Navigator initialRouteName="settings-main">
      <SettingsStack.Screen options={screenHeaderOptions("Settings")} name="settings-main" component={Settings} />
      <SettingsStack.Screen options={screenHeaderOptions("Lightning")} name="lightning-settings" component={LightningSettings} />
      <SettingsStack.Screen options={screenHeaderOptions("Channels")} name="channels" component={Channels} />
      <SettingsStack.Screen options={screenHeaderOptions("Nostr")} name="nostr-settings" component={NostrSettings} />
    </SettingsStack.Navigator>
  )
}

export const NostrNavigator = () => {
  const NostrStack = createNativeStackNavigator()
  return (
    <NostrStack.Navigator>
      <NostrStack.Screen options={screenHeaderOptions("Home")} name="nostr-home-feed" component={HomeFeed} />
      <NostrStack.Screen options={{ headerShown: false }} name="nostr-profile" component={Profile} />
      <NostrStack.Screen options={screenHeaderOptions("Post")} name="nostr-post" component={PostView} />
      <NostrStack.Screen options={screenHeaderOptions("Create Post")} name="nostr-post-create" component={PostCreate} />
    </NostrStack.Navigator>
  )
}

export const BayWalletNavigator = () => {
  const { Navigator, Screen } = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Navigator tabBar={props => <BottomTabBar {...props} />} initialRouteName="nostr">
        <Screen name='nostr' options={{ headerShown: false }} component={NostrNavigator} />
        <Screen name='dev' options={{ headerShown: false }} component={Dev} />
        <Screen name='baywallet' options={{ headerShown: false }} component={WalletNavigator} />
        <Screen name='settings' options={{ headerShown: false }} component={SettingsNavigator} />
      </Navigator>
    </NavigationContainer>
  )
};

export const OnboardNavigator = () => {
  const OnboardStack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <OnboardStack.Navigator initialRouteName="welcome">
        <OnboardStack.Screen options={{ headerShown: false }} name="welcome" component={Welcome} />
        <OnboardStack.Screen options={{ headerShown: false }} name="nostr-introduction" component={NostrIntroduction} />
        <OnboardStack.Screen options={{ headerShown: false }} name="nostr-login" component={NostrLogin} />
        <OnboardStack.Screen options={{ headerShown: false }} name="verify-nostr-profile" component={VerifyNostrProfile} />
        <OnboardStack.Screen options={{ headerShown: false }} name="nostr-create-account" component={NostrCreateAccount} />
        <OnboardStack.Screen options={{ headerShown: false }} name="nostr-profile-setup" component={NostrProfileSetup} />
        <OnboardStack.Screen options={{ headerShown: false }} name="nostr-follow-profiles" component={NostrFollowProfiles} />
        <OnboardStack.Screen options={{ headerShown: false }} name="lightning-introduction" component={LightningIntroduction} />
        <OnboardStack.Screen options={{ headerShown: false }} name="create-lightning-wallet" component={CreateLightningWallet} />
        <OnboardStack.Screen options={{ headerShown: false }} name="sup-stud" component={SupStud} />
      </OnboardStack.Navigator>
    </NavigationContainer>
  )
}

