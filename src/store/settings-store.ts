import { action, makeAutoObservable, observable, runInAction } from "mobx"
import { getItem, setItem } from "../storage"
import { BayWalletSettings, defaultSettings } from "../types/settings"
import {DataStore} from "./index"

export class SettingsStore {
  rootStore: DataStore

  @observable hideBalance:boolean
  @observable settings: BayWalletSettings
  constructor(rootStore:DataStore) {
    this.settingsInit()
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  @action 
  async settingsInit() {
    let settings: BayWalletSettings = await this.getSettings()
    if (!settings) settings = await this.setSetting(JSON.stringify(defaultSettings))
    runInAction(() => {
      this.settings = settings
      this.hideBalance = settings.hideBalance
    })
  }

  @action
  async setSetting(value): Promise<any> {
    const oldSetting: BayWalletSettings = await this.getSettings()
    // const newSetting: BayWalletSettings = { ...oldSetting, settings }
    const saveSetting = JSON.stringify(value)
    console.log("save", saveSetting)
    const save = await setItem("settings", saveSetting)
    return save
  }

  @action
  async getSettings(): Promise<BayWalletSettings> {
    const settings = await getItem<string | false>("settings")
    if (!settings) return 
    return JSON.parse(settings)
  }
}