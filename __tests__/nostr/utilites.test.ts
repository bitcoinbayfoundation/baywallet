import * as nostr from '../../src/util/nostr';
import * as mockData from '../../__mock__/nostr';

describe(`nostr utilities`, () => {
  it('parses bay wallet post', () => {
    const post = nostr.parseBayWalletPost(mockData.parseBayWalletPost.rawEvent);
    expect(post).toEqual(mockData.parseBayWalletPost.expectedResult);
  });

  it('parses bay wallet links', () => {
    const post = nostr.getLinks(mockData.getLinks.rawEvent);
    expect(post).toEqual(mockData.getLinks.expectedResult);
  });

  describe(`nostr profiles`, () => {
    it(`should parse metadata`, () => {
      const metadata = nostr.parseMetadata(mockData.mockProfile.mockRawProfile);
      expect(metadata).toEqual(mockData.mockProfile.mockProfileResult);
    });
  });

  describe(`image urls`, () => {
    it(`should return one image url`, () => {
      const images = nostr.getImageUrls(mockData.oneImageUrl.rawevent);
      expect(images.imageUrls).toEqual(mockData.oneImageUrl.imageUrl);
    });

    it(`should return multiple image urls`, () => {
      const images = nostr.getImageUrls(mockData.multipleImageUrls.rawevent);
      expect(images.imageUrls).toEqual(mockData.multipleImageUrls.imageUrls);
    });
  });
});
