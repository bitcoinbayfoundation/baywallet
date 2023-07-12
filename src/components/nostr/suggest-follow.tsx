import React, { useState } from "react"
import { Avatar, View } from "react-native-ui-lib"
import { parseMetadata } from "../../util/nostr"
import { Event } from "nostr-tools"
import { Button, MediumText, SmallText } from "../misc"

type SuggestFollowProps = {
  event: Event
  followList: string[]
  setFollowList: any
}
export const SuggestFollow = ({ event, followList, setFollowList }: SuggestFollowProps) => {
  const [followed, setFollowed] = useState(false)
  const metadata = parseMetadata(event)
  const name = metadata.display_name || metadata.username || metadata.name
  return (
    <View style={{ justifyContent: "space-between", marginVertical: 10 }} row>
      <View row centerV>
        <Avatar source={{ uri: metadata.picture }} />
        <View width={200} style={{ marginLeft: 10 }}>
          <MediumText content={name} props={{ numberOfLines: 1 }} />
          <SmallText content={metadata.about} props={{ numberOfLines: 1 }} />
        </View>
      </View>
      <Button label={followed ? "Following" : "Follow"} disabled={followed} size="medium" onPress={() => {
        if (followed) {
          setFollowList(followList.filter(follow => follow !== event.pubkey))
        } else {
          setFollowList([...followList, event.pubkey])
        }
        setFollowed(!followed)
      }} />
    </View>
  )
}