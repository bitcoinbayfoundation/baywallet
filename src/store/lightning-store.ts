
import { action, makeObservable, observable, runInAction } from 'mobx';
import AsyncStorage from "@react-native-async-storage/async-storage"

export class LightningStore {

    constructor() {
        makeObservable(this)
    }
    @observable nodeId: string = ""
    @observable account: string = ""

    @action
    setNodeId = async (id:string) => {
        runInAction(() => {
          this.nodeId = id
        })
    }

    @action
    setAccount = async (account:string) => {
      runInAction(() => {
        this.account = account
      })
    }
}