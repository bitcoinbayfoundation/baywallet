import { Event } from "nostr-tools";
import { Metadata } from "../types/nostr";

export const parseMetadata = (profile: Event): Metadata => {
  const rawContent = JSON.parse(profile.content);
  const metadata: Metadata = {
    name: rawContent.name,
    username: rawContent.username,
    display_name: rawContent.display_name,
    picture: rawContent.picture,
    banner: rawContent.banner,
    about: rawContent.about,
    nip05: rawContent.nip05,
    website: rawContent.website,
    lud06: rawContent.lud06,
    lud16: rawContent.lud16,
    pubkey: profile.pubkey
  };
  return metadata;
}