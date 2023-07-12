import React, { useState } from "react";
import { TextField, View } from "react-native-ui-lib";
import { BaseComponent, Button, PhotoUpload, SmallText } from "../../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { OnboardParamList } from "../../navigation";
import { styles } from "./styles"
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';

type NostrProfileSetupScreenProps = NativeStackNavigationProp<OnboardParamList, "nostr-profile-setup">

/**
 * TODO: Upload photo to nostr build for a link
 * TODO: Sign profile event and broadcast to blastr
 */
export const NostrProfileSetup = () => {
  const navigation = useNavigation<NostrProfileSetupScreenProps>()
  const [username, setUsername] = useState<string>(null)
  const [name, setName] = useState<string>(null)
  const [about, setAbout] = useState<string>(null)
  const [photo, setPhoto] = useState<string>(null)

  const handleUploadPhoto = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets) {
        setPhoto(response.assets[0].uri)
      }
    })
  }

  return (
    <BaseComponent>
      <View height="100%" width="100%" style={styles.onboard}>
        <View>
          <View centerH>
            <PhotoUpload photo={photo} handleUpload={handleUploadPhoto} />
            <SmallText content="Profile Picture" styles={{ marginTop: 10 }} />
          </View>
          <TextField
            style={styles.input}
            placeholder='benny blader'
            placeholderTextColor="#444"
            label='Name'
            labelStyle={styles.inputLabel}
            autoCapitalize="none"
            autoFocus={true}
            value={name}
            onChange={change => setName(change.nativeEvent.text)}
          />
          <TextField
            style={styles.input}
            placeholder='bennyblader'
            placeholderTextColor="#444"
            label='Username'
            labelStyle={styles.inputLabel}
            autoCapitalize="none"
            value={username}
            onChange={change => setUsername(change.nativeEvent.text)}
          />
          <TextField
            style={styles.input}
            placeholder='heyhowareya...'
            placeholderTextColor="#444"
            label='About'
            labelStyle={styles.inputLabel}
            autoCapitalize="none"
            value={about}
            onChange={change => setAbout(change.nativeEvent.text)}
          />
        </View>
        <Button label="Create Profile" size="large" style={{ width: "100%" }} disabled={!photo || !name || !username || !about} onPress={() => navigation.navigate("nostr-follow-profiles")} />
      </View>
    </BaseComponent>
  )
}