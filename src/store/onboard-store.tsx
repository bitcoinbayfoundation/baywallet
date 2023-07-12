import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { getNostrKeys } from '../util/keychain';
import { DataStore } from '.';

export class OnboardStore {
  rootStore: DataStore
  @observable done: boolean

  constructor(rootStore: DataStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
    this.checkOnboarded()
  }

  @action
  async checkOnboarded(): Promise<boolean> {
    const keys = await getNostrKeys()
    if (!keys) {
      runInAction(() => {
        this.done = false
      })
      return false
    }
    runInAction(() => {
      this.done = true
    })

    return true
  }
}