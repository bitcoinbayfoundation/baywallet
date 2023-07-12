import React, { useState, useEffect } from "react"
import axios from "axios";
import { Metadata } from "../../types/nostr";
import { parseMetadata } from "../../util/nostr";
import { Avatar, View } from "react-native-ui-lib";
import { MediumText, SmallText } from "../misc";

export const VerifyProfile = ({ pubkey }) => {
  const [metadata, setMetadata] = useState<Metadata>({
    pubkey: '',
    picture: '',
  });

  useEffect(() => {
    const getProfile = async () => {
      const profile = await axios.get(
        `https://api.iris.to/profile/${pubkey}`,
      );
      const metadata = parseMetadata(profile.data)
      setMetadata(metadata);
    };
    getProfile();
  }, []);

  return (
    <View style={{ paddingHorizontal: 10 }} row>
      <Avatar source={{ uri: metadata.picture }} />
      <View style={{ width: "80%", paddingLeft: 10 }}>
        <MediumText content={metadata.display_name || metadata.username || metadata.name} />
        <SmallText content={metadata.about} />
      </View>
    </View>
  )
}