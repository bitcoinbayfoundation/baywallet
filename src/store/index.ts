import { AccountStore } from "./account-store"
import { LightningStore } from "./lightning-store"
class Stores {
    public lightningStore: LightningStore
    public accountStore: AccountStore
    
    constructor() {
        this.lightningStore = new LightningStore()
        this.accountStore = new AccountStore()
    }
}

const stores = new Stores()
export default stores