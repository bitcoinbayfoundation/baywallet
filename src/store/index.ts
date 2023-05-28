import { AccountStore } from "./account-store"
import { LightningStore } from "./lightning-store"
import { LspStore } from "./lsp-store"
import { NostrStore } from "./nostr-store"
import { SettingsStore } from "./settings-store"
export * from "./DataProvider"

export class DataStore {
    public lightningStore: LightningStore
    public accountStore: AccountStore
    public settingsStore: SettingsStore
    public nostrStore: NostrStore
    // public lspStore: LspStore
    
    constructor() {
        this.lightningStore = new LightningStore(this)
        this.accountStore = new AccountStore(this)
        this.settingsStore = new SettingsStore(this)
        this.nostrStore = new NostrStore(this)
        // this.lspStore = new LspStore(this)
    }
}
