import { TChannel } from "@synonymdev/react-native-ldk";
import { Avatar, Divider, Layout, Text } from "@ui-kitten/components";
import React from "react";

type ChannelProps = { channel: TChannel }
export const Channel = ({channel}:ChannelProps) => {
  const { counterparty_node_id, balance_sat, inbound_capacity_sat, is_usable } = channel
  return (
    <>
    <Layout style={{width: "90%", paddingVertical: 15}}>
      <Layout style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
        <Layout style={{width: 10, height: 10, backgroundColor: is_usable ? "#0F0" : "#F00", borderRadius: 100, marginHorizontal: 10}}/>
        <Layout style={{display: "flex", flexDirection: "column", width: "100%"}}>
          <Text style={{width: 250}} numberOfLines={1} ellipsizeMode="tail">{counterparty_node_id}</Text>
          <Layout style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 10}}>
            <Text>{balance_sat.toLocaleString()} sats</Text>
            <Text>{inbound_capacity_sat.toLocaleString()} sats</Text>
          </Layout>
          <Layout style={{width: "100%", backgroundColor: "#AAA", height: 10, borderRadius: 10}} />
        </Layout>
      </Layout>
    </Layout>
    <Divider />
    </>
  )
}