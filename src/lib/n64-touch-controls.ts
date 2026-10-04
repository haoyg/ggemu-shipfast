// GGEMU's N64 bindings expose the stick, Z, L/R and C-Up/C-Down.
const buttons = [
  ['a', 'A', 'bottom-right', -56, -10], ['b', 'B', 'bottom-right', 0, -10],
  ['x', 'C↓', 'middle-right', 0, 28], ['y', 'C↑', 'middle-right', 0, -28],
  ['l', 'L', 'top-left', 0, 56], ['r', 'R', 'top-right', 0, 56],
  ['select', 'Z', 'bottom-center', 0, -10], ['start', 'Start', 'top-center', 0, 56],
] as const
const layout = [
  { type: 'joystick', region: 'bottom-left', size: 120, opacity: 0.8 },
  ...buttons.map(([key, label, region, x, y]) => ({ type: 'button', key, label, region, offset: { x, y }, size: 48, opacity: 0.8 })),
]

export const n64TouchControls = {
  name: 'Nintendo 64',
  layoutMode: 'relative',
  layout: { portrait: layout, landscape: layout },
}
