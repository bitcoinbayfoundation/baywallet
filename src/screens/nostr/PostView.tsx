import React from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { NostrParamList } from "../../navigation"
import { observer } from "mobx-react"
import { FullPost } from "../../components/nostr"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { BaseComponent } from "../../components"
import { ScrollView } from "react-native"
import { useSubscribe } from "../../nostr"
import { parseEventTags } from "../../util/nostr"
import { relayUrls } from "../../util/config"

type PostScreenProps = NativeStackNavigationProp<NostrParamList, "nostr-post">

type PostProps = {
  route?: RouteProp<NostrParamList, "nostr-post">;
}

export const PostView = observer((props: PostProps) => {
  const navigation = useNavigation<PostScreenProps>()
  const { event, profile } = props.route.params
  const tags = parseEventTags(event.tags)

  const replies = useSubscribe({
    relays: relayUrls,
    filters: [{
      "#e": tags.eTags
    }],
    options: {
      force: true
    }
  })
  console.log(replies.events)
  return (
    <BaseComponent>
      <ScrollView>
        <FullPost event={event} metadata={profile} navigation={navigation} />
        {replies?.events?.map((reply, index) => {
          if (event.id === reply.id) return null
          console.log(reply.created_at, reply.created_at > event.created_at)
          return <FullPost key={index} event={reply} metadata={null} navigation={navigation} reply />
        })}
      </ScrollView>
    </BaseComponent>
  )
})