import React from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { NostrParamList } from "../../navigation"
import { observer } from "mobx-react"
import { FullPost } from "../../components/nostr"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { BaseComponent } from "../../components"
import { ScrollView } from "react-native"

type PostScreenProps = NativeStackNavigationProp<NostrParamList, "nostr-post">

type PostProps = {
  route?: RouteProp<NostrParamList, "nostr-post">;
}

export const PostView = observer((props: PostProps) => {
  const navigation = useNavigation<PostScreenProps>()
  const { event, profile } = props.route.params

  return (
    <BaseComponent>
      <ScrollView>
        <FullPost event={event} metadata={profile} navigation={navigation} />
      </ScrollView>
    </BaseComponent>
  )
})