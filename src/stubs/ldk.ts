import { TInvoice } from "@synonymdev/react-native-ldk"

export const ldk = {
  nodeId: "024bfaf0cabe7f874fd33ebf7c6f4e5385971fc504ef3f492432e9e3ec77e1b5cf",
  channel: {
    channel_id: "35634232",
    is_public: true,
    is_usable: true,
    is_channel_ready: true,
    is_outbound: false,
    balance_sat: 13432,
    counterparty_node_id: "021c97a90a411ff2b10dc2a8e32de2f29d2fa49d41bfbb52bd416e460db0747d0d",
    funding_txid: "43t43dve345ge5ge6he6hehe5he",
    channel_type: "ANCHOR",
    user_channel_id: "f43f3gf3f4frfer",
    confirmations_required: 1,
    short_channel_id: 345,
    inbound_scid_alias: 3454,
    inbound_payment_scid: 345,
    inbound_capacity_sat: 248954,
    outbound_capacity_sat: 34325,
    channel_value_satoshis: 234234,
    force_close_spend_delay: 2,
    unspendable_punishment_reserve: 244,
  }
}

export const invoice: TInvoice[] = [{
  amount_satoshis: 467,
  description: "who you callin pinhead?",
  check_signature: true,
  is_expired: false,
  duration_since_epoch: 3,
  expiry_time: 144,
  min_final_cltv_expiry: 144,
  payee_pub_key: "024bfaf0cabe7f874fd33ebf7c6f4e5385971fc504ef3f492432e9e3ec77e1b5cf",
  recover_payee_pub_key: "024bfaf0cabe7f874fd33ebf7c6f4e5385971fc504ef3f492432e9e3ec77e1b5cf",
  payment_hash: "fwew4tg5ve5ge55ge5e",
  payment_secret: "4t4g3g4g",
  timestamp: 21234353,
  features: "BOLT12",
  currency: 1,
  to_str: "wfwefwef",
  route_hints: [],
}]