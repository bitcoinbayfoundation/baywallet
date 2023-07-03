import React from "react";
import { TChannel } from "@synonymdev/react-native-ldk";
import { View } from "react-native-ui-lib";
import { MediumText, SmallText } from "../misc";
import { Colors } from "react-native-ui-lib";
import { StyleSheet } from "react-native";

type ChannelProps = { channel: TChannel }
export const Channel = ({ channel }: ChannelProps) => {
  const { counterparty_node_id, inbound_capacity_sat, is_usable, outbound_capacity_sat, channel_value_satoshis } = channel

  const outbound = (outbound_capacity_sat / channel_value_satoshis) * 100
  const inbound = (inbound_capacity_sat / channel_value_satoshis) * 100

  const inboundStyles = inbound === 100 ? {
    width: `${inbound}%`, backgroundColor: Colors.white, height: 10,
    borderRadius: 10
  } : {
    width: `${inbound}%`, backgroundColor: Colors.white, height: 10,
    borderBottomRightRadius: 10, borderTopEndRadius: 10
  }

  const outboundStyles = outbound === 100 ? {
    width: `${outbound}%`, backgroundColor: Colors.green40, height: 10,
    borderRadius: 10
  } : {
    width: `${outbound}%`, backgroundColor: Colors.green40, height: 10,
    borderBottomLeftRadius: 10, borderTopStartRadius: 10
  }

  const styles = StyleSheet.create({
    channel: {
      paddingVertical: 15,
    },
    active: {
      backgroundColor: is_usable ? Colors.green40 : Colors.red40,
      borderRadius: 100,
      marginHorizontal: 10,
      width: 10,
      height: 10
    },
    balance: {
      justifyContent: "space-between",
      paddingTop: 10
    }
  })

  return (
    <View style={styles.channel} width="90%">
      <View row centerV>
        <View style={styles.active} />
        <View width="100%">
          <MediumText styles={{ width: 250 }} props={{ numberOfLines: 1, ellipsizeMode: "tail" }} content={counterparty_node_id} />
          <View style={styles.balance} row centerV>
            <SmallText content={`${outbound_capacity_sat.toLocaleString()} sats`} />
            <SmallText content={`${inbound_capacity_sat.toLocaleString()} sats`} />
          </View>
          <View row>
            <View style={outboundStyles} />
            <View style={inboundStyles} />
          </View>
        </View>
      </View>
    </View>
  )
}
