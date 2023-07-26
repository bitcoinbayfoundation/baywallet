import usePublish from "../../nostr/usePublish"
import { useDataStore } from "../../store"
import { relayUrls } from "../../util/config"

export const usePostNote = (content: string) => {
  const { nostrKeyStore: { nostrKeys } } = useDataStore()

  const publish = usePublish(relayUrls, nostrKeys.privatekey)

  const postNote = async () => {
    let event = {
      kind: 1,
      tags: [],
      content: content,
    }
    const post = await publish(event)
    return post
  }

  return { postNote }
}