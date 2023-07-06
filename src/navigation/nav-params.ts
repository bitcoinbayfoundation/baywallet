import { TInvoice } from "@synonymdev/react-native-ldk"
import { Metadata } from "../types/nostr"
import { Event } from "nostr-tools"

/**
 * Lightning
 */
export type LightningParamList = {
  wallet: undefined
  settings: undefined
  "create-invoice": undefined
  scan: undefined
  receive: InvoiceScreenProps
  pay: PayScreenProps
}

export type InvoiceScreenProps = {
  invoice: TInvoice
}

export type PayScreenProps = {
  payReq: string
}

/**
 * Nostr
 */

export type NostrParamList = {
  "nostr-home-feed": undefined
  "nostr-profile": {pubkey: string, profile?: Metadata}
  "nostr-post": {event: Event, profile: Metadata}
}

/**
 * Settings
 */
export type SettingsParamList = {
  settings: undefined
  "lightning-settings": undefined
  channels: undefined
  "nostr-settings": undefined
}

/**
 * Onboard
 */
export type OnboardParamList = {
  welcome: undefined
  "nostr-introduction": undefined
  "nostr-login": undefined
  "nostr-create-account": undefined
  "nostr-profile-setup": undefined
  "nostr-follow-profiles": undefined
  "lightning-introduction": undefined
  "create-lightning-wallet": undefined
  "sup-stud": undefined
}