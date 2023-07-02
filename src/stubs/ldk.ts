import {TChannel, TInvoice} from '@synonymdev/react-native-ldk';

export const channels: TChannel[] = [
  {
    channel_id: 'wetko4ptjwiorngrnergerg',
    is_public: true,
    is_usable: true,
    is_channel_ready: true,
    is_outbound: true,
    balance_sat: 452592,
    counterparty_node_id:
      '0234f0cabe7f874fd33ebf7c6f4e5385971fc504ef3f492432e9e3ec77e1b5cf',
    funding_txid: 'wk4iniopw5ngeiwntoviwbetoigbob',
    channel_type: 'ANCHORS',
    user_channel_id: 'wefqwrgpio5ngpenrgponqerpng',
    confirmations_required: 1,
    short_channel_id: 'QWREQRGEGRRE',
    inbound_scid_alias: 323,
    inbound_payment_scid: 1,
    inbound_capacity_sat: 50000,
    outbound_capacity_sat: 50000,
    channel_value_satoshis: 100000,
    force_close_spend_delay: 140,
    unspendable_punishment_reserve: 2424,
    config_forwarding_fee_base_msat: 124,
    config_forwarding_fee_proportional_millionths: 1244,
  },
];

export const invoice: TInvoice[] = [
  {
    amount_satoshis: 467,
    description: 'who you callin pinhead',
    check_signature: true,
    is_expired: false,
    duration_since_epoch: 3,
    expiry_time: 144,
    min_final_cltv_expiry: 144,
    payee_pub_key:
      '024bfaf0cabe7f874fd33ebf7c6f4e5385971fc504ef3f492432e9e3ec77e1b5cf',
    recover_payee_pub_key:
      '024bfaf0cabe7f874fd33ebf7c6f4e5385971fc504ef3f492432e9e3ec77e1b5cf',
    payment_hash: 'fwew4tg5ve5ge55ge5e',
    payment_secret: '4t4g3g4g',
    timestamp: 21234353,
    features: 'BOLT12',
    currency: 'usd',
    to_str: 'wfwefwef',
    route_hints: [],
  },
];
