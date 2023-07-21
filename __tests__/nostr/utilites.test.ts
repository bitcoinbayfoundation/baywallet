import * as nostr from "../../src/util/nostr"
import * as mockData from "../../__mock__/nostr"

describe(`nostr utilities`, () => {

  it(`should parse metadata`, () => {
    const metadata = nostr.parseMetadata(mockData.mockProfile.mockRawProfile)
    expect(metadata).toEqual(mockData.mockProfile.mockProfileResult)
  })
})