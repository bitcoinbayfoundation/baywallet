import React from "react"
import { View, Avatar, Text } from "react-native-ui-lib"
import { Event } from "nostr-tools"
import { Pressable, StyleSheet } from "react-native"
import { Metadata } from "../../types/nostr"
import { Engage } from "./engagement/engage"

type FullPostProps = { note: Event, profile: Metadata, navigation?: any }
export const FullPost = ({ note, profile, navigation }: FullPostProps) => {
  return (
    <View style={styles.fullPost} flex centerV row>
      <Pressable onPress={() => navigation.navigate("nostr-profile", { pubkey: profile?.pubkey })}>
        <Avatar size={40} source={{ uri: profile.picture }} />
      </Pressable>
      <View style={styles.content} width="85%" flex>
        <Text style={{ color: "#AAA" }}>@{profile?.name}</Text>
        <Text style={{ marginTop: 5 }}>{note.content}</Text>
        <Engage
          replyFn={() => null}
          repostFn={() => null}
          reactionFn={() => null}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fullPost: {
    marginVertical: 10
  },
  content: {
    marginLeft: 10
  }
})