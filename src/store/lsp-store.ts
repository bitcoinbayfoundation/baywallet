import { action, makeAutoObservable } from "mobx";
import { getInfo } from "../lsp";
import { DataStore } from ".";
import lm from "@synonymdev/react-native-ldk";
import { lspNodeDev } from "../util/config";
import { LightningStore } from "./lightning-store";

export class LspStore {
  rootStore: DataStore
  lightningStore: LightningStore

  constructor(rootStore: DataStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
    console.log("LSP init")
    getInfo()
  }

  @action
  async connectToLsp() {
    const peer = await lm.addPeer(lspNodeDev)
    if (peer.isErr()) throw Error(`NOT CONNECTED TO LSP: ${lspNodeDev.pubKey}`)
    console.log(`CONNECTING PEER: ${lspNodeDev.pubKey}`, peer.value)
    return peer.value
  }

  @action
  async checkForLspChannel() {
    const channels = await this.rootStore.lightningStore.getChannels()
    const lspChannelExists = channels.find(chan => chan.counterparty_node_id === lspNodeDev.pubKey)
    if (!lspChannelExists) return console.log("LSP channel does not exist")
    return console.log("LSP CHANNEL EXISTS")
  }
}