import {
  ENetworks,
  TAddPeerReq,
  TAvailableNetworks,
} from '@synonymdev/react-native-ldk';
import networks from '@synonymdev/react-native-ldk/dist/utils/networks';
import * as bitcoin from 'bitcoinjs-lib';

// LDK config
export const selectedNetwork: TAvailableNetworks = 'bitcoinSignet';

export const ldkNetwork = (network: TAvailableNetworks): ENetworks => {
  switch (network) {
    case 'bitcoinRegtest':
      return ENetworks.regtest;
    case 'bitcoinTestnet':
      return ENetworks.testnet;
    case 'bitcoinSignet':
      return ENetworks.signet;
    case 'bitcoin':
      return ENetworks.mainnet;
  }
};

export const getNetwork = (
  network: TAvailableNetworks,
): bitcoin.networks.Network => {
  switch (network) {
    case 'bitcoin':
      return networks.bitcoin;
    case 'bitcoinTestnet':
      return networks.testnet;
    case 'bitcoinRegtest':
      return networks.regtest;
    case 'bitcoinSignet':
      return networks.signet;
    default:
      return networks.regtest;
  }
};

export const mempoolHostname = 'mutinynet.com';

//Electrum Server Info (Bitcoin Bay regtest by default)
export const customPeers = {
  bitcoin: [],
  bitcoinTestnet: [],
  bitcoinRegtest: [
    {
      host: '64.225.50.85',
      tcp: 50001,
      protocol: 'tcp',
    },
  ],
};

export const lspNodeDev: {
  bitcoinRegtest: TAddPeerReq;
  bitcoinSignet: TAddPeerReq;
} = {
  bitcoinRegtest: {
    address: '64.225.50.85',
    port: 9736,
    pubKey:
      '037247419cb395f0f691908bf88663eb07cabf3fde8e7184ea922a9814cb16fd8e',
    timeout: 3600,
  },
  bitcoinSignet: {
    address: '64.225.50.85',
    port: 9735,
    pubKey:
      '034baa26eac3185880d2d4e7f1b8615eb631689e092dd1e790c46ff5d64241e7fd',
    timeout: 3600,
  },
};

// Nostr config
export const relayUrls: string[] = [
  'wss://nostr.bitcoinbay.engineering',
  'wss://nos.lol',
  'wss://relay.damus.io',
  'wss://eden.nostr.land',
  'wss://offchain.pub',
];
