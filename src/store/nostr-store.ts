import { makeAutoObservable } from "mobx";
import { DataStore } from ".";

export class NostrStore {
  constructor(rootStore: DataStore) {
    makeAutoObservable(this)
  }
}