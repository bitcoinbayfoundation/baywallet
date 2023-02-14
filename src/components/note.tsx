import React, { useEffect, useState } from "react"
import { Avatar, Divider, Layout, Text } from "@ui-kitten/components"
import { Event, Profile } from "../types/nostr"
import { useDataStore } from "../store/DataProvider"

type NoteProps = { note: Event}
export const Note = ({note}:NoteProps) => {
  const {nostrStore} = useDataStore()
  const { content } = note
  const [profile, setProfile] = useState<Profile>({name: ""})

  const getProfile = async () => {
    const profile = await nostrStore.getProfile(note.pubkey)
    console.log(profile)
    setProfile(profile)
  }
  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
    <Layout style={{marginVertical: 10, display: "flex", flexDirection: "row"}}>
      <Avatar size="medium" source={{uri: profile.picture}}/>
      <Layout style={{display: "flex", flexDirection: 'column', width: "85%", marginLeft: 10}}>
        <Text style={{color: "#AAA"}}>@{profile?.name}</Text>
        <Text style={{marginTop: 5}}>{content}</Text>
      </Layout>
    </Layout>
    <Divider style={{backgroundColor: "#555"}}/>
    </>
  )
}