export const mockProfile = {
  mockRawProfile: {
    id: '2173032c76182a08cfcc486c8dca28c09cad72dc39d6a02ff1aa938d89ae6000',
    kind: 0,
    pubkey: '43c32ed61a8259ddaef6eb43c1c3114524c09690cbb92c57196b395abf73c527',
    tags: [],
    created_at: 1688098111,
    content:
      '{"website":"https://github.com/bennyhodl/baywallet","lud06":"lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhkwmrpwdehjurjd9jhxapkxytx7p52","nip05":"baywallet@bitcoinbay.club","picture":"https://void.cat/d/JmvLC9iEZfkN8hxTJFbXRu.webp","display_name":"Bay Wallet","about":"tampa is the best city in the us","name":"baywallet","banner":"https://nostr.build/i/b56a69d047968e88f2d37392c09a9870506459f4b09857d049f6f92f84d420d6.jpg","lud16":"glassypriest16@walletofsatoshi.com"}',
    sig: '081629f911a04e401787136bbea268897c9ba0c8def5986d7f7e4d1acd7e7efade9b3c5f5ba678ae0fb2223ca909ca03fe3d0a387752af20db2c2affe46a7b01',
  },
  mockProfileResult: {
    name: 'baywallet',
    username: undefined,
    display_name: 'Bay Wallet',
    picture: 'https://void.cat/d/JmvLC9iEZfkN8hxTJFbXRu.webp',
    banner:
      'https://nostr.build/i/b56a69d047968e88f2d37392c09a9870506459f4b09857d049f6f92f84d420d6.jpg',
    about: 'tampa is the best city in the us',
    nip05: 'baywallet@bitcoinbay.club',
    website: 'https://github.com/bennyhodl/baywallet',
    lud06:
      'lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhkwmrpwdehjurjd9jhxapkxytx7p52',
    lud16: 'glassypriest16@walletofsatoshi.com',
    pubkey: '43c32ed61a8259ddaef6eb43c1c3114524c09690cbb92c57196b395abf73c527',
  },
};

export const oneImageUrl = {
  rawevent: {
    id: '6e282855b77671235c6e29f5cc89fb66f2effa7ddf2c6076ea1a17ae0c1aac08',
    pubkey: '66bd8fed3590f2299ef0128f58d67879289e6a99a660e83ead94feab7606fd17',
    created_at: 1690808754,
    kind: 1,
    tags: [
      [
        'r',
        'https://cdn.nostr.build/i/f212478923fad9797e00df7455a56c1c465d50d6e92c8f0151d6a0fb8f3aba07.jpg',
      ],
    ],
    content:
      "It's my bday! \nI turn 34.\n Thank you nostriches \n\nhttps://cdn.nostr.build/i/f212478923fad9797e00df7455a56c1c465d50d6e92c8f0151d6a0fb8f3aba07.jpg",
    sig: '95ccce7ee51e213260cb6cebcf79e076025a7fd7ae8500102cff65a0d972d6c63caffdc71e56fd6f9e904cc89379bdb2d4deb3d0bea3b40534072949ca5144bc',
  },
  imageUrl: [
    `https://cdn.nostr.build/i/f212478923fad9797e00df7455a56c1c465d50d6e92c8f0151d6a0fb8f3aba07.jpg`,
  ],
};

export const multipleImageUrls = {
  rawevent: {
    id: 'a54a49339dba7cb21696fe6d0a0bfee17ebd7ba7425eaa8f46df2f845268d6b5',
    pubkey: '696736ec91f9b497bf0480f73530abd5c4a3bf8e261cfb23096dd88297a2190f',
    created_at: 1690784555,
    kind: 1,
    tags: [],
    content:
      'Rebranded Twitter aka “X” has the new tagline: \n\n“Blaze your glory!”\n\n(Twitter’s previous tagline was “it’s what’s happening”) #twitter #elonmusk #twittermigration #tech #technology #x #musk #technews #news\n\nhttps://files.mastodon.social/media_attachments/files/110/807/251/263/968/334/original/2250ad446ab2b0c9.png\n\nhttps://files.mastodon.social/media_attachments/files/110/807/251/412/891/443/original/53b2fdc7f6603507.png',
    sig: 'a220205e45d4fb13a14e151391e229f81f7afac720cf841be24b56cbef54c54ebf667f613fe1f948b6b76d83785e3589c286cdcc625256d24fee331ee6811f40',
  },
  imageUrls: [
    'https://files.mastodon.social/media_attachments/files/110/807/251/263/968/334/original/2250ad446ab2b0c9.png',
    'https://files.mastodon.social/media_attachments/files/110/807/251/412/891/443/original/53b2fdc7f6603507.png',
  ],
};

export const parseBayWalletPost = {
  rawEvent: {
    id: 'a54a49339dba7cb21696fe6d0a0bfee17ebd7ba7425eaa8f46df2f845268d6b5',
    pubkey: '696736ec91f9b497bf0480f73530abd5c4a3bf8e261cfb23096dd88297a2190f',
    created_at: 1690784555,
    kind: 1,
    tags: [],
    content:
      'https://github.com/bennyhodl\nRebranded Twitter aka “X” has the new tagline: \n\n“Blaze your glory!”\n\n(Twitter’s previous tagline was “it’s what’s happening”) #twitter #elonmusk #twittermigration #tech #technology #x #musk #technews #news\n\nhttps://files.mastodon.social/media_attachments/files/110/807/251/263/968/334/original/2250ad446ab2b0c9.png\n\nhttps://files.mastodon.social/media_attachments/files/110/807/251/412/891/443/original/53b2fdc7f6603507.png',
    sig: 'a220205e45d4fb13a14e151391e229f81f7afac720cf841be24b56cbef54c54ebf667f613fe1f948b6b76d83785e3589c286cdcc625256d24fee331ee6811f40',
  },
  expectedResult: {
    id: 'a54a49339dba7cb21696fe6d0a0bfee17ebd7ba7425eaa8f46df2f845268d6b5',
    pubkey: '696736ec91f9b497bf0480f73530abd5c4a3bf8e261cfb23096dd88297a2190f',
    created_at: 1690784555,
    kind: 1,
    tags: [],
    imageUrls: [
      'https://files.mastodon.social/media_attachments/files/110/807/251/263/968/334/original/2250ad446ab2b0c9.png',
      'https://files.mastodon.social/media_attachments/files/110/807/251/412/891/443/original/53b2fdc7f6603507.png',
    ],
    links: ['https://github.com/bennyhodl'],
    content:
      'Rebranded Twitter aka “X” has the new tagline: \n\n“Blaze your glory!”\n\n(Twitter’s previous tagline was “it’s what’s happening”) #twitter #elonmusk #twittermigration #tech #technology #x #musk #technews #news',
    sig: 'a220205e45d4fb13a14e151391e229f81f7afac720cf841be24b56cbef54c54ebf667f613fe1f948b6b76d83785e3589c286cdcc625256d24fee331ee6811f40',
    references: [],
    eventTags: {
      eTags: [],
      pTags: [],
      qTags: []
    }
  },
};

export const getLinks = {
  rawEvent: {
    id: '597d9bdf588972cc067527ebeae8ad056bc3b118832ac0e48328eed57c25f00e',
    pubkey: '32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245',
    created_at: 1690821959,
    kind: 1,
    tags: [
      ['r', 'https://github.com/orgs/damus-io/projects/3/views/1'],
      ['p', '17538dc2a62769d09443f18c37cbe358fab5bbf981173542aa7c5ff171ed77c4'],
    ],
    content:
      'Incredibly grateful for people who are willing to meticulously organize and schedule the huge backlog of bugs and features on an open source project in their spare time:\n\nhttps://github.com/orgs/damus-io/projects/3/views/1\n\nThank you nostr:npub1zafcms4xya5ap9zr7xxr0jlrtrattwlesytn2s42030lzu0dwlzqpd26k5 ! Because of all your hard work you will be receiving 50 million sats from the damus nostr fund 🤙',
    sig: 'e4232aae45958c08aa51b263fc3e4bb0ba31cb8b45e30c9ff0240447b46c75966ec4c32cd8abac8367bb4f8b8f0b7ecef01df7a7d05051f54236ede8f90a0dd1',
  },
  expectedResult: {
    id: '597d9bdf588972cc067527ebeae8ad056bc3b118832ac0e48328eed57c25f00e',
    pubkey: '32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245',
    created_at: 1690821959,
    kind: 1,
    tags: [
      ['r', 'https://github.com/orgs/damus-io/projects/3/views/1'],
      ['p', '17538dc2a62769d09443f18c37cbe358fab5bbf981173542aa7c5ff171ed77c4'],
    ],
    links: ['https://github.com/orgs/damus-io/projects/3/views/1'],
    content:
      'Incredibly grateful for people who are willing to meticulously organize and schedule the huge backlog of bugs and features on an open source project in their spare time:\n\n\n\nThank you nostr:npub1zafcms4xya5ap9zr7xxr0jlrtrattwlesytn2s42030lzu0dwlzqpd26k5 ! Because of all your hard work you will be receiving 50 million sats from the damus nostr fund 🤙',
    sig: 'e4232aae45958c08aa51b263fc3e4bb0ba31cb8b45e30c9ff0240447b46c75966ec4c32cd8abac8367bb4f8b8f0b7ecef01df7a7d05051f54236ede8f90a0dd1',
  },
};

export const parseMentions = {
  rawEvent: {
    content:
      'Flexing while watching nostr:npub10uthwp4ddc9w5adfuv69m8la4enkwma07fymuetmt93htcww6wgs55xdlq on a graphene pixel fold through the onyx nostr client 😎😎\n\nhttps://cdn.nostr.build/i/058af479f4184a18fe5ab7a1cd80f9263b3697a33cfd37528adce44e09560fa9.jpg\n\nnostr:naddr1qqjxyvtyv9jrvepj95enzd33956rwv3395unvvtp943n2wtzxyckzc3hvverjq3qeaz6dwsnvwkha5sn5puwwyxjgy26uusundrm684lg3vw4ma5c2jsxpqqqpmxwaatdj9\n\n',
    created_at: 1691087311,
    id: '6fe1b39729e749bc8b993b7c27707a10f9d1898eb562a6f790c9bb23279996bf',
    kind: 1,
    pubkey: '5be6446aa8a31c11b3b453bf8dafc9b346ff328d1fa11a0fa02a1e6461f6a9b1',
    sig: '82a74a0d175f3a0dc9c7479c35e365b3596bde4351c492e2a73795feea0aeb85ffa21d8a9207b4b7c60cf94655693b833a84f1b5a6d88e88f25305deea889fa9',
    tags: [
      [
        'p',
        '7f177706ad6e0aea75a9e3345d9ffdae67676faff249be657b596375e1ced391',
        '',
        'mention',
      ],
      [
        'p',
        'cf45a6ba1363ad7ed213a078e710d24115ae721c9b47bd1ebf4458eaefb4c2a5',
        '',
        'mention',
      ],
      [
        'a',
        '30311:cf45a6ba1363ad7ed213a078e710d24115ae721c9b47bd1ebf4458eaefb4c2a5:b1dad6d2-3161-4721-961a-c59b11ab7c29',
        '',
        'mention',
      ],
      [
        'r',
        'https://cdn.nostr.build/i/058af479f4184a18fe5ab7a1cd80f9263b3697a33cfd37528adce44e09560fa9.jpg',
      ],
    ],
  },
  parsedEvent: {
    content:
      'Flexing while watching nostr:npub10uthwp4ddc9w5adfuv69m8la4enkwma07fymuetmt93htcww6wgs55xdlq on a graphene pixel fold through the onyx nostr client 😎😎\n\nhttps://cdn.nostr.build/i/058af479f4184a18fe5ab7a1cd80f9263b3697a33cfd37528adce44e09560fa9.jpg\n\nnostr:naddr1qqjxyvtyv9jrvepj95enzd33956rwv3395unvvtp943n2wtzxyckzc3hvverjq3qeaz6dwsnvwkha5sn5puwwyxjgy26uusundrm684lg3vw4ma5c2jsxpqqqpmxwaatdj9\n\n',
    created_at: 1691087311,
    id: '6fe1b39729e749bc8b993b7c27707a10f9d1898eb562a6f790c9bb23279996bf',
    kind: 1,
    pubkey: '5be6446aa8a31c11b3b453bf8dafc9b346ff328d1fa11a0fa02a1e6461f6a9b1',
    sig: '82a74a0d175f3a0dc9c7479c35e365b3596bde4351c492e2a73795feea0aeb85ffa21d8a9207b4b7c60cf94655693b833a84f1b5a6d88e88f25305deea889fa9',
    tags: [
      [
        'p',
        '7f177706ad6e0aea75a9e3345d9ffdae67676faff249be657b596375e1ced391',
        '',
        'mention',
      ],
      [
        'p',
        'cf45a6ba1363ad7ed213a078e710d24115ae721c9b47bd1ebf4458eaefb4c2a5',
        '',
        'mention',
      ],
      [
        'a',
        '30311:cf45a6ba1363ad7ed213a078e710d24115ae721c9b47bd1ebf4458eaefb4c2a5:b1dad6d2-3161-4721-961a-c59b11ab7c29',
        '',
        'mention',
      ],
      [
        'r',
        'https://cdn.nostr.build/i/058af479f4184a18fe5ab7a1cd80f9263b3697a33cfd37528adce44e09560fa9.jpg',
      ],
    ],
    references: [
      {
        text: 'nostr:npub10uthwp4ddc9w5adfuv69m8la4enkwma07fymuetmt93htcww6wgs55xdlq',
        profile: {
          pubkey:
            '7f177706ad6e0aea75a9e3345d9ffdae67676faff249be657b596375e1ced391',
          relays: [],
        },
      },
      {
        text: 'nostr:naddr1qqjxyvtyv9jrvepj95enzd33956rwv3395unvvtp943n2wtzxyckzc3hvverjq3qeaz6dwsnvwkha5sn5puwwyxjgy26uusundrm684lg3vw4ma5c2jsxpqqqpmxwaatdj9',
        address: {
          identifier: 'b1dad6d2-3161-4721-961a-c59b11ab7c29',
          pubkey:
            'cf45a6ba1363ad7ed213a078e710d24115ae721c9b47bd1ebf4458eaefb4c2a5',
          kind: 30311,
          relays: [],
        },
      },
    ],
  },
};

export const orderedReplies = {
  rawEvents: {
    focusedEvent: {
      id: 'be760ba9366b9d2592a8630ca218d5a19f82c80726d87390a404392a11784ed0',
      pubkey:
        '516add19a861a2f429ccc883fe73243179d5298248c827d68fafe822e697c014',
      created_at: 1691022671,
      kind: 1,
      tags: [
        [
          'e',
          'b8d5ade52a1950cf9a7f0833e1003a62c9d225c9ccfa2b3c0265bf025e8a6092',
        ],
        [
          'e',
          'c8228a26530484599e6d5b12527ea8d4443bd804d1c69cb3bbde6152fe64682d',
        ],
        [
          'e',
          '127653a06d2097a0766be3e7fe8bbe0b3474b50da49d7af4163224e2de102851',
          'wss://relay.nostr.band',
          'reply',
        ],
        [
          'p',
          '516add19a861a2f429ccc883fe73243179d5298248c827d68fafe822e697c014',
        ],
        [
          'p',
          '516add19a861a2f429ccc883fe73243179d5298248c827d68fafe822e697c014',
        ],
        [
          'p',
          'fd6389f914b3ef63c72ab151f958526e85c1279fb1f34850aa954c30a211515d',
        ],
      ],
      content: 'Yes',
      sig: '2daf63185f2b7a33121f96e7c35e2e4b1fb6b42c27b2a5ff7d625ab3a5ddec1eb20485418d1df3e6e837fe00c11b6409c2cfdc3ae4778f3d8bdfa4cfc99b0884',
    },
    replies: [
      {
        id: '127653a06d2097a0766be3e7fe8bbe0b3474b50da49d7af4163224e2de102851',
        pubkey:
          'fd6389f914b3ef63c72ab151f958526e85c1279fb1f34850aa954c30a211515d',
        created_at: 1691020888,
        kind: 1,
        tags: [],
        content: 'Like the leader right?',
        sig: 'f78a1a3454db7d8489bc362daca99742651c8124266234f0f715179de5d73507f51a8085094a41dd27fb8079fda18c58778fb12624d73237f0c7b1aa5293ffd1',
      },
      {
        id: '2b2337daf793e57ad28e892a6f699b4010f553e9753c0f92699a76bb2422b116',
        pubkey:
          'fd6389f914b3ef63c72ab151f958526e85c1279fb1f34850aa954c30a211515d',
        created_at: 1691023010,
        kind: 1,
        tags: [],
        content: 'Sorry, I stupid',
        sig: '0d19696dabd9aebe3161d527d88cf339f1f5aa9b0822a2a156fd488ec49c79450db8708aa118ca38e61546b9ed3200b311b1be1028aa173b2830bee6111fc9aa',
      },
      {
        id: 'c8228a26530484599e6d5b12527ea8d4443bd804d1c69cb3bbde6152fe64682d',
        pubkey:
          '516add19a861a2f429ccc883fe73243179d5298248c827d68fafe822e697c014',
        created_at: 1691017217,
        kind: 1,
        tags: [],
        content: 'Bro. PM of Canada 🇨🇦',
        sig: '375c879e93a455a26d7a3e24dfb48c05c07a7e1b8eec03d05a11289dad0ed2dbcdedad48854472d61cc155c3c681b8c7b78ae79f953e7486b5d86bc471c79d48',
      },
      {
        id: '6f08c518b00f40ce62b1d2ee986eb9bffc6ad6d13d5ebb5bec3ea5dc5d78b486',
        pubkey:
          'fd6389f914b3ef63c72ab151f958526e85c1279fb1f34850aa954c30a211515d',
        created_at: 1691005882,
        kind: 1,
        tags: [],
        content: 'Who are they?',
        sig: 'b43f7820b536a54281f1272bb21413f045c8b2df0bdc0cf1de99fc184e30cc5cad121633a2396fd44b6b24deaf6e9c91cff7a3b265caa16db37e16f0a0322f58',
      },
      {
        id: '0c2f71b7650643db2a55a7173a572874c19af28c8dc7c8cb2170ab26ef5f6cc0',
        pubkey:
          '496d38f69865530028c7d212314d3ce6d605f3528a6c4020a067c9b5bc49fb13',
        created_at: 1691022734,
        kind: 1,
        tags: [],
        content: 'Ities be like, take us to your lead developer🫰🏻.',
        sig: 'ac3e6207863b19d619aa13695edefe37520df7b649d8b7d64b82c27fdc13be37d36e398e277d54e2b816a997da6d96f6bdff42806493ec09ae18fe9045978420',
      },
    ],
  },
  replies: {
    parentReplies: [
      {
        id: '6f08c518b00f40ce62b1d2ee986eb9bffc6ad6d13d5ebb5bec3ea5dc5d78b486',
        pubkey:
          'fd6389f914b3ef63c72ab151f958526e85c1279fb1f34850aa954c30a211515d',
        created_at: 1691005882,
        kind: 1,
        tags: [],
        content: 'Who are they?',
        sig: 'b43f7820b536a54281f1272bb21413f045c8b2df0bdc0cf1de99fc184e30cc5cad121633a2396fd44b6b24deaf6e9c91cff7a3b265caa16db37e16f0a0322f58',
      },
      {
        id: 'c8228a26530484599e6d5b12527ea8d4443bd804d1c69cb3bbde6152fe64682d',
        pubkey:
          '516add19a861a2f429ccc883fe73243179d5298248c827d68fafe822e697c014',
        created_at: 1691017217,
        kind: 1,
        tags: [],
        content: 'Bro. PM of Canada 🇨🇦',
        sig: '375c879e93a455a26d7a3e24dfb48c05c07a7e1b8eec03d05a11289dad0ed2dbcdedad48854472d61cc155c3c681b8c7b78ae79f953e7486b5d86bc471c79d48',
      },
      {
        id: '127653a06d2097a0766be3e7fe8bbe0b3474b50da49d7af4163224e2de102851',
        pubkey:
          'fd6389f914b3ef63c72ab151f958526e85c1279fb1f34850aa954c30a211515d',
        created_at: 1691020888,
        kind: 1,
        tags: [],
        content: 'Like the leader right?',
        sig: 'f78a1a3454db7d8489bc362daca99742651c8124266234f0f715179de5d73507f51a8085094a41dd27fb8079fda18c58778fb12624d73237f0c7b1aa5293ffd1',
      },
    ],
    childReplies: [
      {
        id: '0c2f71b7650643db2a55a7173a572874c19af28c8dc7c8cb2170ab26ef5f6cc0',
        pubkey:
          '496d38f69865530028c7d212314d3ce6d605f3528a6c4020a067c9b5bc49fb13',
        created_at: 1691022734,
        kind: 1,
        tags: [],
        content: 'Ities be like, take us to your lead developer🫰🏻.',
        sig: 'ac3e6207863b19d619aa13695edefe37520df7b649d8b7d64b82c27fdc13be37d36e398e277d54e2b816a997da6d96f6bdff42806493ec09ae18fe9045978420',
      },
      {
        id: '2b2337daf793e57ad28e892a6f699b4010f553e9753c0f92699a76bb2422b116',
        pubkey:
          'fd6389f914b3ef63c72ab151f958526e85c1279fb1f34850aa954c30a211515d',
        created_at: 1691023010,
        kind: 1,
        tags: [],
        content: 'Sorry, I stupid',
        sig: '0d19696dabd9aebe3161d527d88cf339f1f5aa9b0822a2a156fd488ec49c79450db8708aa118ca38e61546b9ed3200b311b1be1028aa173b2830bee6111fc9aa',
      },
    ],
  },
};

export const extractEventTags = {
  rawEvent: {
    id: 'a858e74558f9f904c6581eb8f6eb67058160db7103666966e5cbfb7c04693b0e',
    pubkey: 'd679b0f4c94843077301c920480c9d2f2d12c9fa6d10352e134eb1c08229ac9a',
    created_at: 1691023371,
    kind: 1,
    tags: [
      ['q', 'd11dc884664e64f1fc9a6d0ba9ea38fe1e2d5d831be073338961a81ef0ac6e25'],
      ['p', '9d3a3132661337c0466b744468cdcc0745707f6cf39e2082134d61b048c04c6c'],
    ],
    content:
      'The Humpty Dance; you’ve got it down, when you appear to be in pain!\n\nI love this band’s name, Digital Underground. nostr:note16ywu3prxfej0rly6d596n63clc0z6hvrr0s8xvufvx5pau9vdcjsd5fnuv',
    sig: 'd64507bd4010e99bc4b11e1394d1fbee10dade81f78fa0caa04f29ff448161d1b18b776093b6fe37317199f7915f37b4516f08a713d4efe62b8bddb482e2eab9',
  },
  parsedTags: {
    eTags: [],
    pTags: ["9d3a3132661337c0466b744468cdcc0745707f6cf39e2082134d61b048c04c6c"],
    qTags: ["d11dc884664e64f1fc9a6d0ba9ea38fe1e2d5d831be073338961a81ef0ac6e25"]
  },
};
