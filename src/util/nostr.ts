import { Event } from "nostr-tools";
import { BayWalletPost, Metadata } from "../types/nostr";

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

export const parseBayWalletPost = (event: Event): BayWalletPost => {
  const imageUrls = getImageUrls(event);
  const links = getLinks(imageUrls);
  return links;
}

export const getImageUrls = (event: Event): BayWalletPost => {
    const regex = /\bhttps?:\/\/\S+\.(?:png|jpe?g|webp|gif)\b/g;
    const matches = event.content.match(regex);

    if (!matches) return {...event, imageUrls: []};

    const replaceImageUrls = event.content.replaceAll(regex, "").trim();

    const eventWithImageUrls = {
      ...event,
      content: replaceImageUrls,
      imageUrls: matches
    }

    return eventWithImageUrls;
}

export const getLinks = (event: Event) => {
  const urlRegex = /\bhttps?:\/\/\S+(?<!\.jpg|\.jpeg|\.png|\.gif|\.webp)\b/g
  const matches = event.content.match(urlRegex);

  if (!matches) return {...event, links: []};
  
  const replaceLinks = event.content.replaceAll(urlRegex, "").trim();

  const eventWithLinks = {
    ...event,
    content: replaceLinks,
    links: matches
  }
  
  return eventWithLinks;
}