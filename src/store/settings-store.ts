import { action, makeAutoObservable, observable } from "mobx"
import { getItem, setItem } from "../storage"
import { BayWalletSettings } from "src/types/settings"
import {DataStore} from "./index"

export class SettingsStore {
  rootStore: DataStore
  constructor(rootStore:DataStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  @observable settings: BayWalletSettings

  @action
  async setSetting(key: string, value: string): Promise<any> {
    const oldSetting: BayWalletSettings = await this.getSettings()
    const newSetting: BayWalletSettings = { ...oldSetting, [key]: value }
    const saveSetting = JSON.stringify(newSetting)
    console.log("save", saveSetting)
    const save = await setItem("settings", saveSetting)
    return save
  }

  @action
  async getSettings(): Promise<BayWalletSettings> {
    const settings = await getItem<string | false>("settings") 
    console.log(settings)
    if (!settings) return 
    return JSON.parse(settings)
  }
}