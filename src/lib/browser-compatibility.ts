export type BrowserCapabilityFlags = {
  fullscreen: boolean
  gamepad: boolean
  indexedDb: boolean
  sharedArrayBuffer: boolean
  wasm: boolean
  webgl2: boolean
}

export type BrowserReadiness = {
  label: 'Ready' | 'Limited' | 'Not ready'
  score: number
}

const capabilityWeights: Record<keyof BrowserCapabilityFlags, number> = {
  wasm: 30,
  webgl2: 25,
  indexedDb: 20,
  gamepad: 10,
  sharedArrayBuffer: 10,
  fullscreen: 5,
}

export function evaluateBrowserReadiness(
  capabilities: BrowserCapabilityFlags,
): BrowserReadiness {
  const score = Object.entries(capabilityWeights).reduce(
    (total, [capability, weight]) =>
      capabilities[capability as keyof BrowserCapabilityFlags]
        ? total + weight
        : total,
    0,
  )

  if (!capabilities.wasm || !capabilities.webgl2) {
    return { label: 'Not ready', score }
  }

  return {
    label: capabilities.indexedDb && score >= 75 ? 'Ready' : 'Limited',
    score,
  }
}
