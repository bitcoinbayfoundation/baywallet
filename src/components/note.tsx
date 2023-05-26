import React, { useState } from "react"
import { Avatar, Divider, Layout, Text } from "@ui-kitten/components"
import { Event } from "nostr-tools"
import { useProfile } from "../nostr/useProfile"

type NoteProps = { note: Event}
export const Note = ({note}:NoteProps) => {
  const { content } = note

  const {data: profile} = useProfile({
    pubkey: note.pubkey
  })

  return (
    <>
    <Layout style={{marginVertical: 10, display: "flex", flexDirection: "row"}}>
      <Avatar size="medium" source={{uri: profile?.picture}}/>
      <Layout style={{display: "flex", flexDirection: 'column', width: "85%", marginLeft: 10}}>
        <Text style={{color: "#AAA"}}>@{profile?.name}</Text>
        <Text style={{marginTop: 5}}>{content}</Text>
      </Layout>
    </Layout>
    <Divider />
    </>
  )
}