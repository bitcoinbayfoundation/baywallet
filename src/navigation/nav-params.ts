import { TInvoice } from "@synonymdev/react-native-ldk"
import { BayWalletPost, Metadata } from "../types/nostr"

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
  "nostr-post": {event: BayWalletPost, profile: Metadata}
  "nostr-post-create": undefined
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
  "verify-nostr-profile": {privatekey: string}
  "nostr-create-account": undefined
  "nostr-profile-setup": undefined
  "nostr-follow-profiles": undefined
  "lightning-introduction": undefined
  "create-lightning-wallet": undefined
  "sup-stud": undefined
}