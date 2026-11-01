import { editorialBlogPosts } from './editorial-blog-index'

const contentBySlug: Record<string, string> = {
  'how-to-play-roms-in-browser': `A browser-based retro game player can run a compatible game without asking you to install a separate desktop emulator. The web page supplies the player interface, while the loaded game still follows the controls, save system and limitations of its original platform. Before starting, check the exact game version, input mapping and save options instead of assuming every page behaves the same way.

This guide explains the process without offering ROM downloads. Only use game files and services you are legally allowed to use. POKOPIE game pages provide the available browser entry and version notes; they do not make every original accessory, network service or console feature work in a modern browser.

## Choose the exact game and platform

Start with the game’s detail page rather than a generic player window. Read the listed platform, release year, language and version notes. A title may have separate NES, SNES, Game Boy Advance, Nintendo 64, PlayStation or arcade editions with different controls, levels and save systems.

Do not assume that a familiar name identifies the exact release. Paperboy on Nintendo 64 is not the same build as the arcade or NES game. Donkey Kong on NES omits one screen from the full arcade release. A browser page should describe the loaded edition rather than combining facts from every version.

Use POKOPIE’s platform collections to narrow the library:

https://pokopie.com/en/nes-games

https://pokopie.com/en/snes-games

https://pokopie.com/en/gba-games

https://pokopie.com/en/n64-games

https://pokopie.com/en/ps1-games

## Start the player and give it input focus

Select the visible Play button and wait for the player to finish loading. Some pages have one launch button on the detail page and another inside the player. Complete each visible step once instead of repeatedly clicking while game data is still loading.

Click inside the game area before using the keyboard. If a search field, browser address bar or surrounding page has focus, arrow keys and letters may control the page instead of the game. Open the player’s controls menu and identify directions, confirm, cancel, Start, Select and any shoulder or arcade credit buttons.

Keyboard mappings vary by player and platform. A common example on some checked POKOPIE builds is W/A/S/D for directions, K for the original A button, J for B and Enter for Start, but that is not a universal layout. Fighting games, Nintendo 64 games and browser-native puzzles can use different mappings.

## Test controls before a long session

Use a title screen or safe opening area to test one action at a time. Confirm movement, the primary action, cancel and pause. For a fighting game, identify all attack buttons. For an arcade game, check whether it needs a credit input before Start. For a Nintendo DS game, verify how the player displays two screens and exposes touch input.

If a modern controller is connected, check the selected controller port and Player 1 assignment. Browser detection alone does not prove that the correct player or every button is mapped. Test both movement and an action before relying on the controller.

Touch controls are player-specific. A phone overlay may omit buttons needed by an original controller, and some upstream games explicitly restrict phone use. A site language switch cannot remove a device limitation imposed by the loaded player.

## Understand game saves, save states and browser storage

An in-game save is created by the game’s own menu. A save state captures the emulator’s current machine state. They are different, and one does not guarantee the other is available.

After making a small amount of progress, create a test save using the method the page provides. Reload it before committing to a long session. If the player offers export or download for save data, keep a backup before clearing browser data, changing profiles or moving to another device.

Browser storage can be tied to the current domain and profile. Private browsing, storage cleanup and browser privacy settings may remove or isolate progress. Do not clear site data as the first response to a loading problem.

Read the dedicated save guide:

https://pokopie.com/en/guides/how-browser-game-saves-work

## Fix black screens, missing sound and unresponsive keys

A black screen can mean the player is still loading, waiting for Start, blocked on an unsupported device or unable to fetch a game resource. Wait for the visible loading step, then compare with one smaller game to determine whether the problem affects one title or the whole connection.

For missing sound, interact with the player first. Modern browsers can delay audio until a user gesture. Then check the player volume, muted browser tab, operating-system output and connected Bluetooth device.

For unresponsive keys, click the player, reopen its control mapping and make sure another input field does not have focus. Reload only after protecting any save data. If the failure continues, record the game URL, browser, device and visible message.

Use the troubleshooting guide:

https://pokopie.com/en/blog/browser-game-black-screen-no-sound-controls-fix

## Know which original features may not work

Browser play does not automatically reproduce original hardware accessories or discontinued network services. Pokémon HeartGold’s Pokéwalker used infrared communication with a physical Nintendo DS Game Card. Nintendo Wi-Fi Connection for Nintendo DS software was discontinued in 2014. These features should not be advertised as available merely because the main game starts.

The same caution applies to light guns, microphones, link cables, memory cards, local multiplayer ports and analog controls. The detail page should state known limitations; otherwise test the required feature before investing time in the game.

## A quick browser-play checklist

1. Confirm the game title, platform, language and version.
2. Open the player and wait for loading to finish.
3. Focus the game area and inspect the current controls.
4. Test movement, actions, Start and pause.
5. Check device-specific features such as touch, analog input or two screens.
6. Create and restore a small test save.
7. Keep an export or backup if the player supports it.
8. Treat original network and accessory features as unsupported unless verified.

## Technical references

MDN explains how IndexedDB provides persistent browser storage for web applications:

https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

Chrome’s autoplay policy explains why audio may wait for user interaction:

https://developer.chrome.com/blog/autoplay

EmulatorJS documents control mapping for players that use EmulatorJS:

https://emulatorjs.org/docs4devs/control-mapping/`,
  'murdoku-beginner-solving-guide': `Murdoku asks you to reconstruct a crime scene, not fill a grid with numbers. Place every person according to the clues, keeping each person in a different row and column. Once the arrangement works, identify the person alone with the victim in the same area. Start with a definite placement and use it to eliminate possibilities elsewhere.

This guide uses an invented example rather than an answer to an official case. For the original rules, see Manuel Garand’s printable Courtroom puzzle. The definitions below follow that case; always read the legend for the puzzle you actually open.

## Read the scene before placing anyone

Look for the victim, named areas, furniture and the scene legend. An area is a marked part of the scene; it is not necessarily the entire row or column. A clue about being in a room restricts a person to that area, but it may leave several possible squares.

Do not assume that every furniture square is blocked. The Courtroom legend distinguishes occupiable spaces, including chairs and carpet, from objects that cannot be occupied, such as tables and plants. Consult the current scene’s legend instead of applying a blanket rule to all objects.

## Work through an original elimination example

Imagine an invented five-by-five scene. Casey has two candidates: row 2, column 2 and row 2, column 5. A definite clue places Rin at row 4, column 2. Rin occupies column 2, so Casey cannot use that column and must stand at row 2, column 5.

Nori’s candidates are row 1, column 5 and row 1, column 3. Casey has now occupied column 5, leaving Nori at row 1, column 3. Owen’s candidates are row 1, column 4 and row 3, column 4. Since Nori occupies row 1, Owen must stand at row 3, column 4. One confirmed clue has produced a chain of three deductions.

For this example only, the victim is at row 5, column 1, and the Studio area covers the bottom two rows. Rin at row 4, column 2 is the only other person in that area: Casey, Nori and Owen are all in the top three rows. Rin is therefore the example’s killer. Check that all five people, including the victim, occupy different rows and columns before accepting the conclusion.

These names, candidates and the Studio layout are fictional, not a secret solution to a published puzzle. If Rin’s initial position were only a tentative note, the later placements would also be tentative. The deduction chain needs a confirmed starting fact.

## Keep notes separate from confirmed positions

Record all the squares a person could occupy until the clues leave only one. In the desktop embedded build previously checked on POKOPIE, a short click records a candidate and a press-and-hold confirms a placement after selecting a person. Follow the current game’s tutorial if the controls differ, and use Undo to reverse an accidental action.

Before confirming a square, ask: does it satisfy the person’s clue, is it in a free row and column, and does the legend allow someone to stand there? A square that passes only one of those checks is still a candidate.

## Interpret beside without adding diagonal squares

In the official Courtroom rules, beside means immediately left, right, above or below an object, within the same area. A diagonal square does not qualify. A square across an area boundary also does not qualify just because it touches the object.

For a plant beside a boundary, first list the orthogonal neighboring squares. Remove any outside the relevant area, any blocked by the legend, and any in occupied rows or columns. This combines the spatial clue with the global placement rule.

## Identify the killer after checking the arrangement

The final question concerns the victim’s area. Find the one person who shares that area with the victim and nobody else. Do not select the nearest person on the grid or stop after one suspicious-looking clue. Recheck every placement before submitting your conclusion.

If you get stuck, return to the last confirmed fact and inspect the notes that depended on it. Common mistakes are treating a note as a fact, allowing two people in one column, counting diagonals as beside, or overlooking an area boundary.

## Open a case and check device support

The POKOPIE detail page includes a quick-start card and the browser play entry. The embedded build is listed for desktop use. If it refuses a phone, use the official-site link on the detail page rather than repeatedly changing the website language.

Play Murdoku and read the controls:

https://pokopie.com/en/games/murdoku-html5-2026

## Sources and further reading

Official Courtroom puzzle and rule legend:

https://murdoku.com/pdf/the-courtroom-bw.pdf

Murdoku by Manuel Garand, including free online and printable cases:

https://murdoku.com/?lang=en`,
  'browser-game-black-screen-no-sound-controls-fix': `When a browser game stops responding, first identify what is failing: the page, the player, the game’s loading process, audio, or input. Start with reversible checks. Refreshing or deleting site data too early can discard progress and make the problem harder to diagnose.

This is a troubleshooting sequence, not a claim that every browser or game has been tested. POKOPIE’s earlier Pokémon Emerald browser checks reached the introduction with desktop keyboard and mobile touch input; that limited result does not establish support for every title, controller or multiplayer mode.

## A black screen is not always a failed game

Check whether you have actually started the player. Some entries show Play Now on the detail page and another start control inside the embedded player. Complete those visible steps once, then watch for a progress indicator or a game title screen.

If the player is still transferring game data, allow it to finish before clicking Start repeatedly. A detail page loading correctly only proves that the page is reachable; the embedded game may depend on a different host or a larger download. Compare with one other small title to determine whether the failure affects one game or the whole connection.

If the loaded page explicitly says the device is unsupported, stop retrying the same embedded build. Murdoku’s detail page, for example, provides an official-site link for phone visitors when the upstream embedded entry is desktop-only. A working phone browser does not override a player’s device restriction.

## The game runs but there is no sound

Click or tap the game’s own start or play control. Chrome’s autoplay policy can suspend audio until a user interacts with the page. Then check the player’s volume, the browser tab’s mute state and your device’s selected output. Bluetooth headphones may route sound somewhere you did not expect.

If sound disappears after a tab has been in the background, bring the tab forward and use the game or player’s resume control if available. Do not change experimental browser flags to force autoplay. A deliberate interaction and ordinary sound settings are the appropriate first checks.

## Keyboard controls do nothing or scroll the page

Click inside the player before pressing keys. If a search box or browser address bar has focus, the same keypress can type text or scroll the surrounding page instead of reaching the game. Open the player’s controls menu and read the mapping for the actual game platform.

On the previously checked Pokémon Emerald build, W/A/S/D were directions, K was A, J was B and Enter was Start. Those are example bindings for that build, not a universal POKOPIE layout. A fighting game, an N64 game or a browser-native puzzle can use different controls.

For touch controls, test a menu movement and confirm action before beginning a long session. If a quick tap is not registered, try a brief hold. Avoid assuming that the website interface language also changes the language inside the game.

## A controller connects but the wrong player moves

Open input settings and check the selected player or controller port. A gamepad being visible to the browser does not guarantee that it is assigned to Player 1, or that Player 2 has a separate mapping. Test each player’s movement and one action separately before testing both together.

Disconnect and reconnect the device if the player offers no detection, then revisit its input menu. Consult the controller guide for setup steps. These checks cannot supply networking support to a game that only offers same-device multiplayer.

## Reload only after protecting your progress

Use the game’s save command or the player’s save/export feature when available. Confirm what was saved: an in-game save and an emulator save state are different. Read the save guide before clearing storage, switching browser profiles or opening a private session.

If you can reproduce the problem after a normal reload, record the exact game URL, device, browser version, visible message and the last action before the failure. That information is more useful than reporting only that the site does not work. Avoid clearing all browser data as a first troubleshooting step.

## Useful POKOPIE pages

Keyboard and controller setup:

https://pokopie.com/en/guides/retro-game-controller-guide

Save states, game saves and browser storage:

https://pokopie.com/en/guides/how-browser-game-saves-work

Pokémon Emerald’s build-specific input notes:

https://pokopie.com/en/games/pokemon-emerald-gba-2004

## Technical sources

Chrome’s explanation of autoplay and user interaction:

https://developer.chrome.com/blog/autoplay

EmulatorJS control mapping documentation, relevant to players that actually use that emulator:

https://emulatorjs.org/docs4devs/control-mapping/`,
  'two-player-browser-retro-games-guide': `For two people sharing a computer, start by checking that the original game offers a simultaneous two-player mode and that the loaded browser player exposes two sets of inputs. A catalog label saying two players is not proof of online multiplayer, and a gamepad being connected is not proof that Player 2 has joined.

This guide separates original-game features from browser-player checks. It does not present a complete co-op playthrough or promise remote multiplayer. Use the short input test below before committing to a long session.

## Same-device co-op, alternating turns and online play

Same-device co-op means both people play on one computer, using separate keyboard mappings or controllers. Alternating-turn games also support two players, but only one may be active at a time. Online multiplayer needs a separate networking feature, such as a room or supported netplay service; it does not follow automatically from the original game supporting two controllers.

Decide which experience you want before browsing. For a shared laptop, clearly separated keyboard layouts are useful. For different households, check for an explicit room or network-play feature and its instructions rather than trying to join a local-only game from a second tab.

## Contra: check the exact version and the two-player menu

Contra is a useful starting point for a shared-screen action session, but identify the NES entry rather than assuming an arcade version has the same menus and controls. Open the title screen, select the two-player mode when available and check that both player slots respond before advancing.

A desktop Chrome check on October 15, 2026 reached this entry’s embedded player and its Player 1 keyboard guide: W/A/S/D for directions, J for B, K for A, Shift for Select/Coin and Enter for Start. The check did not establish independent Player 2 input. Treat it as a launch-and-controls check, not a verified co-op playthrough or a promise that a second keyboard layout is available.

Keep both characters visible and coordinate movement as the screen advances. Before starting a serious run, test jump and attack for each player individually and together. If a character never joins, inspect Player 2’s Start and action mappings rather than repeatedly pressing Player 1’s controls.

Open the NES Contra entry:

https://pokopie.com/en/games/contra-nes-1988

## Yan Loong Legend 2: choose The Double Dragon

Creetor’s official collection identifies The Double Dragon as the series version that introduced two-player play. Do not substitute the first chapter or 2nd Impact just because the names are similar. The version matters more than the broad series label.

This is local cooperative play. Check the loaded build’s instructions for both players’ movement, attack and jump controls. Keyboard layouts and wrapper behavior can differ, so this guide does not invent a second-player mapping or advertise an online room that has not been verified.

Open The Double Dragon:

https://pokopie.com/en/games/yanlong-chuanshuo-2-shuang-long-flash-2009

## Run a short input check before playing

First, read the game’s own controls screen or the player’s input menu. Identify Player 1 and Player 2, including their Start or join controls. Confirm which menu option launches a simultaneous game rather than an alternating-turn mode.

Second, have Player 1 move and perform one action while Player 2 does nothing. Then reverse the test. If one input moves both characters, inspect the port assignments and overlapping bindings. If only one character responds, check whether the second character has actually joined.

Third, move both characters and perform actions together. Some keyboards cannot register particular combinations of held keys. If controls fail only when both people press several keys, try a different layout or separately mapped gamepads if the loaded player supports them. Do not assume that changing browsers will add unsupported input hardware.

## What a successful test does and does not show

Two characters responding independently demonstrates the basic same-device input path for that build and setup. It does not prove that later stages, saves, every controller or another device will behave identically. A title screen showing a two-player option alone is weaker evidence than seeing both characters respond.

For phones, verify two-player touch support explicitly. A touch overlay intended for one person is not automatically a practical way for two people to share the screen. Desktop play with clearly separated controls is the more straightforward setup to investigate first.

## Sources and related help

Konami’s official series page distinguishes the arcade, NES and Famicom entries:

https://www.konami.com/games/50th/ac/contra/asia/en/

Creetor’s official collection describes The Double Dragon and its two-player feature:

https://store.steampowered.com/app/2615380/12/

EmulatorJS documents distinct player mappings; this applies only when the loaded player uses EmulatorJS:

https://emulatorjs.org/docs4devs/control-mapping/

Read the controller setup guide:

https://pokopie.com/en/guides/retro-game-controller-guide

If sound or controls fail before the second player joins:

https://pokopie.com/en/blog/browser-game-black-screen-no-sound-controls-fix`,
}

export function getEditorialBlogPost(id: string) {
  const post = editorialBlogPosts.find(post => post.slug === id)
  return post ? { ...post, content: contentBySlug[id] } : undefined
}
