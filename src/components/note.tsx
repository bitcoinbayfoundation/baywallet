import React, { useState } from "react"
import { Avatar, Divider, Layout, Text } from "@ui-kitten/components"
import { Event } from "nostr-tools"
import { useProfile } from "../nostr/useProfile"
import { Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

type NoteProps = { note: Event, navigation?: any}
export const Note = ({note, navigation}:NoteProps) => {
  // const navigation = useNavigation()
  const { content } = note

  const {data: profile} = useProfile({
    pubkey: note.pubkey
  })

  return (
    <>
    <Layout style={{marginVertical: 10, display: "flex", flexDirection: "row"}}>
      <Pressable onPress={() => navigation.navigate("nostr-profile", {pubkey: "3f194d7cf5c59eca0145ed7804f0a67c0cc17b6ff6b4bd585821160dcf9d785b"})}>
        <Avatar size="medium" source={{uri: profile?.picture}} />
      </Pressable>
      <Layout style={{display: "flex", flexDirection: 'column', width: "85%", marginLeft: 10}}>
        <Text style={{color: "#AAA"}}>@{profile?.name}</Text>
        <Text style={{marginTop: 5}}>{content}</Text>
      </Layout>
    </Layout>
    <Divider />
    </>
  )
}