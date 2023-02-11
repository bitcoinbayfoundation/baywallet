import { AccountStore } from "./account-store"
import { LightningStore } from "./lightning-store"
import { SettingsStore } from "./settings-store"
export class DataStore {
    public lightningStore: LightningStore
    public accountStore: AccountStore
    public settingsStore: SettingsStore
    
    constructor() {
        this.lightningStore = new LightningStore(this)
        this.accountStore = new AccountStore(this)
        this.settingsStore = new SettingsStore(this)
    }
}