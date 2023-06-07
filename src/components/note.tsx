import React from "react"
import { Avatar, Divider, Layout, Text } from "@ui-kitten/components"
import { Event } from "nostr-tools"
import { Pressable } from "react-native"
import { useCachedProfile } from "../hooks/nostr"
import { useDataStore } from "../store"

type NoteProps = { note: Event, navigation?: any}
export const Note = ({note, navigation}:NoteProps) => {
  const {keyStore: {nostrKeys}} = useDataStore()
  const {profile} = useCachedProfile(note.pubkey)
  
  return (
    <>
    <Layout style={{marginVertical: 10, display: "flex", flexDirection: "row"}}>
      <Pressable onPress={() => navigation.navigate("nostr-profile", {pubkey: nostrKeys.pubkey})}>
        <Avatar size="medium" source={{uri: profile?.picture}} />
      </Pressable>
      <Layout style={{display: "flex", flexDirection: 'column', width: "85%", marginLeft: 10}}>
        <Text style={{color: "#AAA"}}>@{profile?.name}</Text>
        <Text style={{marginTop: 5}}>{note.content}</Text>
      </Layout>
    </Layout>
    <Divider />
    </>
  )
}