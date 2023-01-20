import { LightningStore } from "./lightning-store"
class Stores {
    public lightningStore: LightningStore
    
    constructor() {
        this.lightningStore = new LightningStore()
    }
}

const stores = new Stores()
export default stores