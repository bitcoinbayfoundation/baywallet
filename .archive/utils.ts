import { nip19 } from "nostr-tools"

export const uniqBy = <T>(arr: T[], key: keyof T): T[] => {
  return Object.values(
    arr.reduce(
      (map, item) => ({
        ...map,
        [`${item[key]}`]: item,
      }),
      {},
    ),
  )
}

export const uniqValues = (value: string, index: number, self: string[]) => {
  return self.indexOf(value) === index
}

export const dateToUnix = (_date?: Date) => {
  const date = _date || new Date()

  return Math.floor(date.getTime() / 1000)
}

export const npubToHex = (npub: string): string => {
  const {data} = nip19.decode(npub)
  return data as string
}

export const ONE_WEEK_AGO = 604_800