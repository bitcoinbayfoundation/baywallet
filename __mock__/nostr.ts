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
    'https://files.mastodon.social/media_attachments/files/110/807/251/412/891/443/original/53b2fdc7f6603507.png'
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
      'https://files.mastodon.social/media_attachments/files/110/807/251/412/891/443/original/53b2fdc7f6603507.png'
    ],
    links: [
      "https://github.com/bennyhodl"
    ],
    content:
      'Rebranded Twitter aka “X” has the new tagline: \n\n“Blaze your glory!”\n\n(Twitter’s previous tagline was “it’s what’s happening”) #twitter #elonmusk #twittermigration #tech #technology #x #musk #technews #news',
    sig: 'a220205e45d4fb13a14e151391e229f81f7afac720cf841be24b56cbef54c54ebf667f613fe1f948b6b76d83785e3589c286cdcc625256d24fee331ee6811f40',
  }
}

export const getLinks = {
  rawEvent: {
      id: '597d9bdf588972cc067527ebeae8ad056bc3b118832ac0e48328eed57c25f00e',
      pubkey:
        '32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245',
      created_at: 1690821959,
      kind: 1,
      tags: [
        ['r', 'https://github.com/orgs/damus-io/projects/3/views/1'],
        [
          'p',
          '17538dc2a62769d09443f18c37cbe358fab5bbf981173542aa7c5ff171ed77c4',
        ],
      ],
      content:
        'Incredibly grateful for people who are willing to meticulously organize and schedule the huge backlog of bugs and features on an open source project in their spare time:\n\nhttps://github.com/orgs/damus-io/projects/3/views/1\n\nThank you nostr:npub1zafcms4xya5ap9zr7xxr0jlrtrattwlesytn2s42030lzu0dwlzqpd26k5 ! Because of all your hard work you will be receiving 50 million sats from the damus nostr fund 🤙',
      sig: 'e4232aae45958c08aa51b263fc3e4bb0ba31cb8b45e30c9ff0240447b46c75966ec4c32cd8abac8367bb4f8b8f0b7ecef01df7a7d05051f54236ede8f90a0dd1',
    },
    expectedResult: {
      id: '597d9bdf588972cc067527ebeae8ad056bc3b118832ac0e48328eed57c25f00e',
      pubkey:
        '32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245',
      created_at: 1690821959,
      kind: 1,
      tags: [
        ['r', 'https://github.com/orgs/damus-io/projects/3/views/1'],
        [
          'p',
          '17538dc2a62769d09443f18c37cbe358fab5bbf981173542aa7c5ff171ed77c4',
        ],
      ],
      links: [
        "https://github.com/orgs/damus-io/projects/3/views/1"
      ],
      content:
        'Incredibly grateful for people who are willing to meticulously organize and schedule the huge backlog of bugs and features on an open source project in their spare time:\n\n\n\nThank you nostr:npub1zafcms4xya5ap9zr7xxr0jlrtrattwlesytn2s42030lzu0dwlzqpd26k5 ! Because of all your hard work you will be receiving 50 million sats from the damus nostr fund 🤙',
      sig: 'e4232aae45958c08aa51b263fc3e4bb0ba31cb8b45e30c9ff0240447b46c75966ec4c32cd8abac8367bb4f8b8f0b7ecef01df7a7d05051f54236ede8f90a0dd1',
    },
}