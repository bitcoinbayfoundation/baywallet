import React, { useState } from "react";
import { BaseComponent, Button } from "../../components";
import { Avatar, TextField, View } from "react-native-ui-lib";
import { usePostNote } from "../../hooks/nostr/use-post-note";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NostrParamList } from "../../navigation";
import { useNavigation } from "@react-navigation/native";

type PostCreateProps = NativeStackNavigationProp<NostrParamList, "nostr-post-create">

export const PostCreate = () => {
  const navigation = useNavigation<PostCreateProps>()
  const [content, setContent] = useState('')
  const { postNote } = usePostNote(content)

  const post = async () => {
    await postNote()
    navigation.navigate("nostr-home-feed")
  }

  return (
    <BaseComponent>
      <View style={{ marginTop: 20, marginHorizontal: 10 }}>
        <TextField
          placeholder="Make a post..."
          style={{ paddingHorizontal: 20, fontSize: 16 }}
          multiline
          onChangeText={(value) => setContent(value)}
          enableErrors
          leadingAccessory={<Avatar source={{ uri: "https://pbs.twimg.com/profile_images/1679488827252002816/MR2yHAqe_400x400.jpg" }} />}
          showCharCounter
          maxLength={300}
        />
      </View>
      <Button label="Post" onPress={async () => await post()} props={{ fullWidth: true }} style={{ position: "absolute", bottom: 10, width: "95%" }} />
    </BaseComponent>
  )
}