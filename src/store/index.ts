export * from './DataProvider';
import {LightningStore} from './lightning-store';
import {KeyStore} from './key-store';
import {SettingsStore} from './settings-store';
// import { LspStore } from "./lsp-store"

export class DataStore {
  public lightningStore: LightningStore;
  public keyStore: KeyStore;
  public settingsStore: SettingsStore;
  // public lspStore: LspStore

  constructor() {
    this.lightningStore = new LightningStore(this);
    this.keyStore = new KeyStore(this);
    this.settingsStore = new SettingsStore(this);
    // this.lspStore = new LspStore(this)
  }
}
