export type TimedCacheValue<T> = {
  expiresAt: number
  staleUntil: number
  value: T
}

export class TimedAsyncCache {
  private readonly entries = new Map<string, TimedCacheValue<unknown>>()
  private readonly pending = new Map<string, Promise<unknown>>()

  constructor(private readonly maxEntries: number) {
    if (!Number.isInteger(maxEntries) || maxEntries <= 0) {
      throw new Error('maxEntries must be a positive integer')
    }
  }

  get<T>(key: string, now = Date.now()) {
    const entry = this.entries.get(key) as TimedCacheValue<T> | undefined

    if (!entry) {
      return undefined
    }

    if (entry.staleUntil <= now) {
      this.entries.delete(key)
      return undefined
    }

    // Refresh insertion order so the Map also acts as a small LRU cache.
    this.entries.delete(key)
    this.entries.set(key, entry)

    return entry
  }

  set<T>(key: string, entry: TimedCacheValue<T>, now = Date.now()) {
    this.deleteExpired(now)
    this.entries.delete(key)
    this.entries.set(key, entry)

    while (this.entries.size > this.maxEntries) {
      const oldestKey = this.entries.keys().next().value

      if (oldestKey === undefined) {
        break
      }

      this.entries.delete(oldestKey)
    }
  }

  run<T>(key: string, load: () => Promise<T>) {
    const existing = this.pending.get(key) as Promise<T> | undefined

    if (existing) {
      return existing
    }

    const request = load().finally(() => {
      if (this.pending.get(key) === request) {
        this.pending.delete(key)
      }
    })

    this.pending.set(key, request)
    return request
  }

  private deleteExpired(now: number) {
    for (const [key, entry] of this.entries) {
      if (entry.staleUntil <= now) {
        this.entries.delete(key)
      }
    }
  }
}
