/**
 * Curated four-letter subset of ENABLE 1 (Enhanced North American Benchmark
 * Lexicon), public domain. Source snapshot: dolph/dictionary enable1.txt,
 * master revision accessed 2026-10-10.
 *
 * The MVP intentionally accepts a familiar-word subset instead of every
 * obscure ENABLE entry. This keeps the client bundle small and the game fair.
 * Source: https://github.com/dolph/dictionary/blob/master/enable1.txt
 */
const words = `
able acid acre acts adds aged ages aids aims airs airy also amen amid ammo amps
anti apex arch area army arts atom aunt auto away axis baby back bade bags bail
bait bake bald bale ball band bane bank bare bark barn base bash bask bass bath
bats beam bean bear beat beds beef been beer bees bell belt bend bent best bias
bike bind bird bite bits blew blob bloc blog blow blue blur boat body boil bold
bolt bond bone bong book boom boon boot bore born boss both bowl bows boys brag
bran bred brew brim brow buck buds buff bugs bulb bulk bull bump burn burr bury
bush busy buys byte cafe cage cake calf call calm came camp cane cans cape caps
card care carp cars cart case cash cast cave cell cent chap chat chef chew chin
chip chop cite city clad clam clan clap claw clay clip club clue coal coat code
coil coin cold colt comb come cone cook cool coop cope copy cord core cork corn
cost cosy cote cots crab crew crop crow cube cues cuff cups curb cure curl cuts
cute dame damp dare dark darn dart dash data date dawn days dead deaf deal dean
dear debt deck deed deem deep deer desk dial dice died dies diet dime dine dire
dirt disc dish dock does dogs doll dome done doom door dose down drag draw drew
drop drum dual duck dull dumb dump dune dusk dust duty each earn ears ease east
easy eats echo edge edit else emit ends envy epic even ever evil exam exit face
fact fade fail fair fake fall fame fans fare farm fast fate fear feat feed feel
feet fell felt file fill film find fine fire firm fish fist fits five flag flat
flaw fled flew flip flow foam foil fold folk fond food fool foot ford fork form
fort foul four free frog from fuel full fund gain game gate gave gaze gear gems
gift girl give glad glow glue goad goal goat goes gold golf gone good gore gown
grab gray grew grey grim grin grip grow gulf guts hail hair half hall hand hang
hard hare harm hate have head heal heap hear heat held hell help herd here hero
hide high hike hill hint hire hive hold hole holy home hood hook hope horn host
hour huge hunt hurt idea idle inch into iron item jail jazz join joke jump just
keen keep kept kick kids kill kind king kiss kite knee knew knit knob knot know
lack lady laid lake lamb lame lamp land lane last late lead leaf leak lean left
lend lens less liar lick life lift like limb lime line link lion list live load
loaf loan lock loft logo lone long look loom loon loop lose loss lost lots loud
love luck lump made mail main make male mall many mare mark mars mash mask mass
mate math maze meal mean meat meet melt menu mere mesh mild mile milk mind mine
mint miss mist mode mole monk mood moon more moss most mote move much must myth
nail name navy near neck need nest news next nice nine node none noon nose note
noun obey odds okay once only onto open oral pace pack page paid pain pair pale
palm pane park part pass past path peak pear peas peer pens pick pile pine pink
pipe plan play plot plug plus poem pole poll pond pool poor pope pork port pose
post pour pray puff pull pump pure push quiz race rail rain rake rang rank rare
rate read real rear reed reef reel rent rest rice rich ride ring rise risk road
roar rock rode role roll roof room root rope rose rows ruin rule rune rush safe
said sail sake sale salt same sand save seal seam seat seed seem seen self sell
send sent shed shin ship shoe shop shot show shut sick side sigh sign silk sill
sing sink site size skin skip slam slip slow slug snap snow soap sock soft soil
sold sole some song sons soon soot sore sort soul sour span spin spot star stay
stem step stew stir stop such suit sure swim tail take tale talk tall tame tank
tape task team tear teal tell tend tent term test text than that them then thin
this time tiny tire tone tons took tool tops tore torn tour town tree trim trip
true tube tune turn twin type undo unit upon used user vast very view vote wade
wage wait wake walk wall wand want ward warm wash wast wave ways weak wear weed
week well went were west what when whip wide wife wild will wind wine wing wire
wise wish wolf wood wool word wore work worm worn yard yarn yeah year your zero
zone zoom
`

export const WORD_LADDER_DICTIONARY_VERSION = 'enable1-curated-4-v1'
export const WORD_LADDER_DICTIONARY_SOURCE =
  'ENABLE 1, public domain, dolph/dictionary master snapshot accessed 2026-10-10'

export const WORD_LADDER_WORDS = Object.freeze(
  words.trim().split(/\s+/).map((word) => word.toLowerCase()),
)

export const WORD_LADDER_WORD_SET = new Set(WORD_LADDER_WORDS)
