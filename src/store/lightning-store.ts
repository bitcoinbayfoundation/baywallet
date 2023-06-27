import {action, makeAutoObservable, observable, runInAction} from 'mobx';
import ldk from '@synonymdev/react-native-ldk/dist/ldk';
import {TAddPeerReq, TInvoice} from '@synonymdev/react-native-ldk';
import {TChannel} from '@synonymdev/react-native-ldk';
import {DataStore} from '.';
import {invoice} from '../stubs/ldk';
import {log} from '../util/logger';

export class LightningStore {
  rootStore: DataStore;
  @observable nodeId: string = null;
  @observable peers: string[] = null;
  @observable channels: TChannel[] = null;
  @observable balance: number;
  @observable transactions: TInvoice[];

  constructor(rootStore: DataStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action
  async getLightningInfo() {
    await this.getNodeId();
    await this.getPeers();
    await this.getChannels();
    await this.getNodeBalance();
  }

  @action
  getNodeId = async (): Promise<string> => {
    const nodeId = await ldk.nodeId();
    if (nodeId.isErr()) {
      throw new Error('Could not get node id.');
    }
    runInAction(() => {
      this.nodeId = nodeId.value;
    });

    return nodeId.value;
  };

  @action
  async addPeer(address: string, port: number, pubKey: string) {
    const peerConfig: TAddPeerReq = {
      address,
      port,
      pubKey,
      timeout: 3600,
    };

    const peerAdded = await ldk.addPeer(peerConfig);
    if (peerAdded.isErr()) {
      return log.ldk('no peer');
    }

    return peerAdded.value;
  }

  @action
  async getPeers(): Promise<string[]> {
    const peers = await ldk.listPeers();
    if (peers.isErr()) {
      throw new Error('Could not get peers.');
    }
    runInAction(() => {
      this.peers = peers.value;
    });
    return peers.value;
  }

  @action
  async getChannels(): Promise<TChannel[]> {
    const channels = await ldk.listChannels();
    if (channels.isErr()) {
      throw new Error('Could not get channels.');
    }
    runInAction(() => {
      this.channels = channels.value;
    });
    return channels.value;
  }

  @action
  async createInvoice(
    amountSats: number,
    description: string,
  ): Promise<TInvoice> {
    // const msats = this.satsToMilliSats(amountSat)
    const payReq = await ldk.createPaymentRequest({
      amountSats,
      description,
      expiryDeltaSeconds: 3600,
    });
    if (payReq.isErr()) {
      throw new Error('Could not create invoice.');
    }
    return payReq.value;
  }

  @action
  async getNodeBalance() {
    let balance: number = 0;
    const channels = await this.getChannels();
    if (channels.length !== 0) {
      channels?.map(chan => {
        balance += chan.balance_sat;
      });
    }
    runInAction(() => (this.balance = balance));
    return balance;
  }

  @action
  async getLightningTransactions() {
    runInAction(() => (this.transactions = invoice));
  }
}
