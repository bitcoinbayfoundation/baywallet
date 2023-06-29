import { TInvoice } from "@synonymdev/react-native-ldk"
import { Metadata } from "../types/nostr"
import { Event } from "nostr-tools"

/**
 * Lightning
 */
export type NavParamList = {
  home: undefined
  settings: undefined
  receive: undefined
  scan: undefined
  invoice: InvoiceScreenProps
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
  "advanced-settings": undefined
  channels: undefined
  "nostr-settings": undefined
}