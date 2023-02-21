import { TChannel } from "@synonymdev/react-native-ldk";
import { Avatar, Divider, Layout, Text, useTheme } from "@ui-kitten/components";
import React from "react";

type ChannelProps = { channel: TChannel }
export const Channel = ({channel}:ChannelProps) => {
  const theme = useTheme()
  const { counterparty_node_id, balance_sat, inbound_capacity_sat, is_usable, outbound_capacity_sat } = channel
  const totalCapacity = inbound_capacity_sat + outbound_capacity_sat
  const outbound = (outbound_capacity_sat / totalCapacity) * 100
  const inbound = (inbound_capacity_sat / totalCapacity) * 100
  console.log("inboiucd", inbound, "outboufn", outbound)

  const inboundStyles = inbound === 100 ? {
    width: `${inbound}%`, backgroundColor: "#CCC", height: 10, 
    borderRadius: 10
  } : {
    width: `${inbound}%`, backgroundColor: "#CCC", height: 10, 
    borderBottomRightRadius: 10, borderTopEndRadius: 10 
  }

  const outboundStyles = outbound === 100 ? {
    width: `${outbound}%`, backgroundColor: theme["color-success-600"], height: 10, 
    borderRadius: 10
  } : {
    width: `${outbound}%`, backgroundColor: theme["color-success-600"], height: 10, 
    borderBottomLeftRadius: 10, borderTopStartRadius: 10
  }

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
          <Layout style={{display:"flex", flexDirection:"row"}}>
          <Layout style={outboundStyles} />
          <Layout style={inboundStyles} />
          </Layout>
        </Layout>
      </Layout>
    </Layout>
    <Divider />
    </>
  )
}

