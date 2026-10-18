export type CardGameCategory = 'Traditional' | 'Published' | 'Digital' | 'Solitaire'

export type CardDeckType = 'standard' | 'regional' | 'dedicated' | 'digital'
export const cardDeckLabels: Record<CardDeckType, string> = { standard: 'Standard deck(s)', regional: 'Shortened / regional pack', dedicated: 'Special game cards', digital: 'Digital deck' }

export type MCardGame = {
  id: string
  name: string
  category: CardGameCategory
  deck: string
  deckType: CardDeckType
  players: number[]
  playerNote?: string
  playerSourceUrl?: string
  description: string
  rulesUrl: string
  source: string
  aliases?: string[]
}

export const mCardGamesCheckedAt = '2026-10-18'

const traditionalGames: Array<Omit<MCardGame, 'id' | 'category' | 'source'>> = [
  {
    name: 'Machiavelli', deckType: 'standard', players: [2, 3, 4, 5], deck: 'Two standard 52-card decks',
    description: 'An Italian manipulation-rummy variant. Empty your hand by laying down sets and runs, rearranging existing melds only when every table card finishes in a valid combination.',
    rulesUrl: 'https://www.pagat.com/rummy/carousel.html#machiavelli',
  },
  {
    name: 'Madrasso', deckType: 'regional', players: [4], aliases: ['Magrasso', 'Mandrasso'], deck: '40-card Italian pack',
    description: 'Four players form two partnerships and capture valuable cards in tricks. Players must follow suit when possible; a trump suit changes which card wins.',
    rulesUrl: 'https://www.pagat.com/aceten/madrasso.html',
  },
  {
    name: 'Magarac', deckType: 'standard', players: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], playerNote: '3–13 shown for a single standard pack; larger groups need extra cards.', deck: 'Standard cards, adjusted for the group',
    description: 'A relative of Pig in which players pass cards to collect matching ranks. Watch for the finishing signal as well as your own hand; consult the linked Magarac variant.',
    rulesUrl: 'https://www.pagat.com/passing/pig.html#vatra',
  },
  {
    name: 'Main Merah', deckType: 'standard', players: [2, 3], deck: 'Standard 52-card deck',
    description: 'An Indonesian fishing game related to Chinese Ten. Play cards to capture from a face-up layout, then turn a stock card; scoring emphasizes particular captured cards.',
    rulesUrl: 'https://www.pagat.com/fishing/chinten.html#mainmerah',
  },
  {
    name: 'Malilla', deckType: 'regional', players: [4], aliases: ['Manilla', 'Malillas'], deck: '40-card Spanish pack or an adapted standard deck',
    description: 'A partnership trick-taking game with unusually powerful sevens. Capture scoring cards with your partner; do not assume the usual ace-high card order applies.',
    rulesUrl: 'https://www.pagat.com/manille/malilla.html',
  },
  {
    name: 'Maniglia', deckType: 'regional', players: [3, 4, 5], deck: '40-card Italian pack; variants use fewer cards',
    description: 'A mainland Italian relative of Mariglia. Capture point-valued cards in tricks; the source distinguishes a four-player partnership game from bidding versions for other player counts.',
    rulesUrl: 'https://www.pagat.com/manille/mariglia.html#maniglia',
  },
  {
    name: 'Manillen', deckType: 'regional', players: [4], playerNote: 'Four-player partnership version; variants are not included in this filter.', deck: '32-card pack',
    description: 'A Belgian partnership game in which tens rank above aces. Aim to collect valuable cards in tricks rather than simply winning the greatest number of tricks.',
    rulesUrl: 'https://www.pagat.com/manille/manillen.html',
  },
  {
    name: 'Manipulation Rummy', deckType: 'standard', players: [3, 4, 5, 6, 7], aliases: ['Manipulation', 'Finagle'], deck: 'Two or more standard decks, depending on the variant',
    description: 'A rummy family built around reorganizing shared sets and runs. Add cards from your hand while leaving all table cards legally melded; drawing rules differ between versions.',
    rulesUrl: 'https://www.pagat.com/rummy/carousel.html#manipulation',
  },
  {
    name: 'Manni', deckType: 'regional', players: [3], deck: '48 cards, removing twos from a standard deck',
    description: 'An Icelandic three-player trick-taking game. A spare hand offers a possible exchange before play, and players score according to how their tricks compare with a quota.',
    rulesUrl: 'https://www.pagat.com/quotawhist/manni.html',
  },
  {
    name: 'Mao', deckType: 'standard', players: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], deck: 'One or more standard decks',
    description: 'A shedding game whose table rules are traditionally kept secret. Players learn from observation and penalties. The linked discussion reveals how the game works, so read it only if you want that explanation.',
    rulesUrl: 'https://www.pagat.com/eights/mao.html',
  },
  {
    name: 'Marianna', deckType: 'regional', players: [4], deck: '40-card pack',
    description: 'An Italian partnership game related to Briscola. Capture valuable cards and declare marriage combinations, which score bonuses and influence the trump suit.',
    rulesUrl: 'https://www.pagat.com/marriage/marianna.html',
  },
  {
    name: 'Mariáš', deckType: 'regional', players: [2, 3, 4], aliases: ['Marias'], deck: '32-card German-suited pack',
    description: 'A Czech and Slovak point-trick game, commonly played by three people. Contracts, trump play and marriage bonuses shape the score; two- and four-player versions also exist.',
    rulesUrl: 'https://www.pagat.com/marriage/marias.html',
  },
  {
    name: 'Mariglia', deckType: 'regional', players: [4], deck: '40-card Italian pack',
    description: 'A Sardinian partnership trick-taking game in the Manille family. Collect valuable cards over ten tricks, using the specific ranking and partner-communication rules of the chosen version.',
    rulesUrl: 'https://www.pagat.com/manille/mariglia.html',
  },
  {
    name: 'Marjapussi', deckType: 'regional', players: [4], deck: '36-card pack',
    description: 'A Finnish four-player partnership game with scoring cards and marriage declarations. This version has no bidding; do not confuse it with the related bidding game Huutopussi.',
    rulesUrl: 'https://www.pagat.com/marriage/marjapussi.html',
  },
  {
    name: 'Marjolet', deckType: 'regional', players: [2], deck: '32-card pack',
    description: 'A two-player French ancestor of Bezique in the marriage family. Combine trick-taking with scoring combinations; the linked historical description explains the detailed scoring.',
    rulesUrl: 'https://www.pagat.com/marriage/marjolet.html',
  },
  {
    name: 'Marriage', deckType: 'standard', players: [2, 3, 4, 5], aliases: ['Marriage Rummy'], deck: 'Three standard 52-card decks',
    description: 'A rummy game popular in Nepal. Form three-card sets and runs while using the deal’s designated wild cards; this is a particular game, not every game with a marriage bonus.',
    rulesUrl: 'https://www.pagat.com/rummy/marriage.html',
  },
  {
    name: 'Memory', deckType: 'standard', players: [1, 2, 3, 4, 5, 6, 7, 8], playerNote: '1 in our browser game; 2–8 in the linked multiplayer rules.', aliases: ['Concentration', 'Pelmanism'], deck: 'Matching picture cards or a standard deck',
    description: 'Turn over two face-down cards at a time and keep matching pairs. Remember the positions of unmatched cards; the player collecting the most pairs wins the multiplayer version.',
    rulesUrl: 'https://www.pagat.com/misc/pelmanism.html',
  },
  {
    name: 'Memory Bridge', deckType: 'standard', players: [2], deck: 'Standard 52-card deck',
    description: 'A two-player bridge variant. Play the first thirteen-card hands without trumps, then deal the remaining cards for a second phase with bidding and normal bridge play.',
    rulesUrl: 'https://www.pagat.com/auctionwhist/honeymoon.html#memory',
  },
  {
    name: 'Mendikot', deckType: 'standard', players: [4], aliases: ['Mendhi Coat', 'Mendhi Goat'], deck: 'Standard 52-card deck',
    description: 'An Indian four-player partnership game centered on capturing tens. Win tricks with your partner and pay attention to the version’s method of determining trumps.',
    rulesUrl: 'https://www.pagat.com/pointtrk/mendikot.html',
  },
  {
    name: 'Michigan', deckType: 'standard', players: [3, 4, 5, 6, 7, 8], aliases: ['Boodle', 'Newmarket', 'Stops'], deck: 'Standard deck and a scoring layout',
    description: 'A stops game in which players shed cards by continuing suit sequences and collect counters for specified pay cards. Michigan Rummy can refer to a different multi-phase variant.',
    rulesUrl: 'https://www.pagat.com/stops/michigan.html',
  },
  {
    name: 'Mighty', deckType: 'standard', players: [5], playerNote: 'Five-player version; other counts change the deck and rules.', deck: 'Standard deck plus a joker in the five-player version',
    description: 'A Korean bidding and trick-taking game with a called partner. Capture enough scoring cards to fulfill the bid, accounting for special cards such as the mighty and joker.',
    rulesUrl: 'https://www.pagat.com/picture/mighty.html',
  },
  {
    name: 'Mille', deckType: 'standard', players: [2], deck: 'Two standard 52-card decks',
    description: 'A Canadian two-player rummy game. Draw, meld equal-ranked sets and discard while managing wild twos and valuable cards. It is unrelated to the racing game Mille Bornes.',
    rulesUrl: 'https://www.pagat.com/rummy/mille.html',
  },
  {
    name: 'Minchiate', deckType: 'dedicated', players: [4], aliases: ['Germini'], deck: 'Special 97-card Minchiate pack',
    description: 'An Italian tarot trick-taking game using an expanded historical pack. Capture valuable cards and scoring sequences; an ordinary 52-card deck cannot reproduce the full game.',
    rulesUrl: 'https://www.pagat.com/tarot/minchiate.html',
  },
  {
    name: 'Minibridge', deckType: 'standard', players: [4], deck: 'Standard 52-card deck',
    description: 'A simplified route into partnership bridge. Determine a contract without the full bidding auction, then practice declarer play, following suit and winning the required tricks.',
    rulesUrl: 'https://www.pagat.com/auctionwhist/bridge.html#minibridge',
  },
  {
    name: 'Mitaines', deckType: 'standard', players: [2, 3, 4], aliases: ['Mitts'], deck: 'Standard 52-card deck',
    description: 'A French Canadian capture game. Match the common pile’s top card or use a jack, and score named combinations of equal-ranked cards called mittens, gloves and socks.',
    rulesUrl: 'https://www.pagat.com/fishing/mitaines.html',
  },
  {
    name: 'Mizerka', deckType: 'standard', players: [3], deck: 'Standard 52-card deck',
    description: 'A Polish three-player game with rotating contracts and a spare hand. Most contracts reward tricks; the mizerka contract reverses the objective and rewards avoiding them.',
    rulesUrl: 'https://www.pagat.com/quotawhist/mizerka.html',
  },
  {
    name: 'Mulle', deckType: 'standard', players: [2, 3, 4, 5, 6], deck: 'Two standard decks',
    description: 'A Swedish variant of the fishing game Casino. Capture cards from a face-up table using numerical combinations, with special scores for taking a duplicate of a played card.',
    rulesUrl: 'https://www.pagat.com/fishing/nordic_casino.html#mulle',
  },
  {
    name: 'Mus', deckType: 'regional', players: [4], deck: '40-card Spanish pack',
    description: 'A Basque-origin partnership game of drawing, hand comparison and bluffing. Compare high cards, low cards, pairs and game totals across separate scoring contests.',
    rulesUrl: 'https://www.pagat.com/vying/mus.html',
  },
  {
    name: 'Mustamaija', deckType: 'standard', players: [2, 3, 4, 5, 6], deck: 'Standard 52-card deck',
    description: 'A Finnish attacking-and-defending game. Try to get rid of your cards and avoid being left with the queen of spades; it is not the Hearts variant Black Maria.',
    rulesUrl: 'https://www.pagat.com/beating/mustamaija.html',
  },
]

const otherGames: Array<Omit<MCardGame, 'id'>> = [
  {
    name: 'Magic: The Gathering', deckType: 'dedicated', players: [2], playerNote: 'Two-player duel; other formats have different player counts.', aliases: ['Magic', 'MTG'], category: 'Published', deck: 'Magic cards; deck construction depends on the format',
    description: 'A trading card game of lands, mana, creatures and spells. Build or choose a deck and use combat and card abilities to defeat opponents; multiplayer formats have different construction rules.',
    rulesUrl: 'https://magic.wizards.com/en/how-to-play', source: 'Wizards of the Coast',
  },
  {
    name: 'Mamma Mia!', deckType: 'dedicated', players: [2, 3, 4, 5], category: 'Published', deck: 'The game’s ingredient and pizza-order cards',
    description: 'Add ingredients and pizza orders to a shared stack, remembering what is already inside. Reveal the stack to see which orders can be completed and score finished pizzas.',
    rulesUrl: 'https://pegasus.de/en/Mamma-Mia/ABA08988', source: 'Pegasus / ABACUSSPIELE rules',
  },
  {
    name: 'Marvel Champions: The Card Game', deckType: 'dedicated', players: [1, 2, 3, 4], aliases: ['Marvel Champions'], category: 'Published', deck: 'Marvel Champions hero and scenario cards',
    description: 'A cooperative card game for one to four players. Switch between hero and alter-ego forms, defeat villains and prevent their schemes from succeeding.',
    rulesUrl: 'https://www.fantasyflightgames.com/product/marvel-champions-the-card-game/', source: 'Fantasy Flight Games',
  },
  {
    name: 'Marvel Snap', deckType: 'digital', players: [2], category: 'Digital', deck: 'A deck in the Marvel Snap app',
    description: 'A digital card battler about committing power to locations. Spend energy on character cards and aim to control more locations than your opponent; special modes can change the core rules.',
    rulesUrl: 'https://marvelsnap.com/how-to-play/', source: 'Marvel Snap official guide',
  },
  {
    name: 'Mau-Mau', deckType: 'regional', players: [], playerNote: 'Player count is not specified in the linked app rules.', aliases: ['Mau Mau'], category: 'Traditional', deck: 'Standard cards; the linked app uses its own preset',
    description: 'Shed cards by matching the previous card’s suit or rank, with special cards affecting play. Agree on house rules first; the linked developer guide describes one specific implementation.',
    rulesUrl: 'https://info.lite.games/en/support/solutions/articles/60000701375-crazy-eights-rules-mau-mau', source: 'LITE Games rules for its version',
  },
  {
    name: 'Mille Bornes', deckType: 'dedicated', players: [2, 3, 4, 5, 6], playerSourceUrl: 'https://store.asmodee.com/products/mille-bornes', category: 'Published', deck: 'Mille Bornes distance, hazard, remedy and safety cards',
    description: 'Race toward the required distance using mileage cards. Delay opponents with hazards, recover with remedies and use safety cards to protect your journey; follow your edition’s scoring.',
    rulesUrl: 'https://instructions.hasbro.com/en-ca/instruction/mille-bornes-card-game', source: 'Hasbro rules for its edition',
  },
  {
    name: 'Miss Milligan', deckType: 'standard', players: [1], category: 'Solitaire', deck: 'Two standard decks',
    description: 'Move cards to the foundations in this two-deck patience game. Empty spaces take kings, and a reserve becomes available after the stock is exhausted in the linked PySolFC version.',
    rulesUrl: 'https://pysolfc.sourceforge.io/doc/rules/missmilligan.html', source: 'PySolFC rules',
  },
  {
    name: 'Monopoly Deal', deckType: 'dedicated', players: [2, 3, 4, 5], playerSourceUrl: 'https://consumercare.hasbro.com/en-us/product/monopoly-deal-card-game-quick-playing-family-card-game-for-2-5-players-ages-8-plus/86FDE41C-A99B-4942-B354-D7150A366734', category: 'Published', deck: 'Monopoly Deal property, money and action cards',
    description: 'Collect complete property sets while using money and action cards to manage rent, payments and property exchanges. It uses a dedicated card deck rather than the Monopoly board.',
    rulesUrl: 'https://instructions.hasbro.com/en-us/instruction/monopoly-deal-card-game', source: 'Hasbro official rules',
  },
  {
    name: 'Monte Carlo', deckType: 'standard', players: [1], category: 'Solitaire', deck: 'One standard deck',
    description: 'Remove equal-ranked pairs that touch horizontally, vertically or diagonally. Compact and refill the layout when no pairs remain; try to clear all cards.',
    rulesUrl: 'https://pysolfc.sourceforge.io/doc/rules/montecarlo.html', source: 'PySolFC rules',
  },
  {
    name: 'Mü', deckType: 'dedicated', players: [3, 4, 5, 6], playerNote: '3–6 for the current publisher edition; classic rules may differ.', aliases: ['Mu'], category: 'Published', deck: 'The dedicated Mü deck',
    description: 'A trick-taking game with an exposed-card auction. Bidding determines leaders, trump choices and a temporary team aiming to collect enough scoring points. The publisher links current and classic versions.',
    rulesUrl: 'https://www.heidelbaer.de/mue-mehr', source: 'HeidelBÄR rules and classic rules (German)',
  },
  {
    name: 'Munchkin', playerSourceUrl: 'https://munchkin.game/products/games/munchkin/', deckType: 'dedicated', players: [3, 4, 5, 6], playerNote: '3–6 for the original base game; other editions may differ.', category: 'Published', deck: 'Munchkin Door and Treasure cards',
    description: 'A competitive dungeon-themed card game. Fight monsters, collect equipment and gain levels while negotiating help or interfering with rivals; follow the rules for the edition you own.',
    rulesUrl: 'https://munchkin.game/gameplay/rules/', source: 'Munchkin official rulebooks',
  },
]

export const mCardGames: MCardGame[] = [
  ...traditionalGames.map(game => ({ ...game, category: 'Traditional' as const, source: 'Pagat rules' })),
  ...otherGames,
].map(game => ({ ...game, id: normalizeCardGameSearch(game.name).replace(/[^a-z0-9]+/g, '-').replace(/-$/, '') }))
  .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))

export function normalizeCardGameSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

export type MCardGameFilters = { players?: number; deckType?: CardDeckType | 'All' }

export function getCardGamePlayerLabel(game: MCardGame) {
  if (!game.players.length) return 'See rules'
  const first = game.players[0]
  const last = game.players[game.players.length - 1]
  if (game.players.length === 1) return first === 1 ? '1 (solo)' : String(first)
  return game.players.length === last - first + 1 ? `${first}–${last}` : game.players.join(', ')
}

export function filterMCardGames(query: string, category: CardGameCategory | 'All' = 'All', filters: MCardGameFilters = {}) {
  const search = normalizeCardGameSearch(query)
  return mCardGames.filter(game =>
    (category === 'All' || game.category === category) &&
    (filters.players === undefined || game.players.includes(filters.players)) &&
    (!filters.deckType || filters.deckType === 'All' || game.deckType === filters.deckType) &&
    normalizeCardGameSearch([game.name, ...(game.aliases ?? []), game.deck, game.description].join(' ')).includes(search),
  )
}
