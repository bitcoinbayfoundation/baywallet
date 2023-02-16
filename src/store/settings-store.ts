import AsyncStorage from "@react-native-async-storage/async-storage"
import { action, makeAutoObservable, observable, runInAction } from "mobx"
import { getItem, setItem } from "../storage"
import { BayWalletSettings, SettingsKey, defaultSettings } from "../types/settings"
import {DataStore} from "./index"

export class SettingsStore {
  rootStore: DataStore
  
  @observable settings: BayWalletSettings

  constructor(rootStore:DataStore) {
    this.rootStore = rootStore
    this.settingsInit()
    makeAutoObservable(this)
  }

  @action 
  async settingsInit() {
    let settings: BayWalletSettings = await this.getSettings()
    if (!settings) return await this.initDefaultSetting()
    runInAction(() => {
      this.settings = settings
    })
  }

  private async initDefaultSetting() {
    await setItem("settings", JSON.stringify(defaultSettings))
    runInAction(() => {
      this.settings = defaultSettings
    })
  }

  @action
  async wipeSettings() {
    return await AsyncStorage.removeItem("settings")
  }

  @action
  async setSetting(setting?: SettingsKey, value?: any): Promise<any> {
    const oldSetting: BayWalletSettings = await this.getSettings()
    const newSetting: BayWalletSettings = { ...oldSetting, [setting]: value }
    await setItem("settings", JSON.stringify(newSetting))
    runInAction(() => {
      this.settings = newSetting
    })
  }

  @action
  async getSettings(): Promise<BayWalletSettings> {
    const settings = await getItem<string | false>("settings")
    if (!settings) return
    return JSON.parse(settings)
  }
}