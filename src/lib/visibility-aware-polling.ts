type VisibilityAwarePollingOptions = {
  intervalMs: number
  maxIntervalMs?: number
  run: () => Promise<void>
}

export function startVisibilityAwarePolling({
  intervalMs,
  maxIntervalMs = intervalMs * 6,
  run,
}: VisibilityAwarePollingOptions) {
  let failureCount = 0
  let isRequesting = false
  let isStopped = false
  let timeoutId: number | undefined

  function canPoll() {
    return document.visibilityState === 'visible' && navigator.onLine
  }

  function clearScheduledPoll() {
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId)
      timeoutId = undefined
    }
  }

  function scheduleNextPoll() {
    clearScheduledPoll()

    if (isStopped || !canPoll()) {
      return
    }

    timeoutId = window.setTimeout(
      poll,
      getPollingDelay(intervalMs, maxIntervalMs, failureCount),
    )
  }

  async function poll() {
    clearScheduledPoll()

    if (isStopped || isRequesting || !canPoll()) {
      return
    }

    isRequesting = true

    try {
      await run()
      failureCount = 0
    } catch {
      failureCount += 1
    } finally {
      isRequesting = false
      scheduleNextPoll()
    }
  }

  function handleAvailabilityChange() {
    clearScheduledPoll()

    if (canPoll() && !isRequesting) {
      void poll()
    }
  }

  document.addEventListener('visibilitychange', handleAvailabilityChange)
  window.addEventListener('online', handleAvailabilityChange)
  window.addEventListener('offline', handleAvailabilityChange)
  scheduleNextPoll()

  return () => {
    isStopped = true
    clearScheduledPoll()
    document.removeEventListener('visibilitychange', handleAvailabilityChange)
    window.removeEventListener('online', handleAvailabilityChange)
    window.removeEventListener('offline', handleAvailabilityChange)
  }
}

export function getPollingDelay(
  intervalMs: number,
  maxIntervalMs: number,
  failureCount: number,
) {
  const multiplier = 2 ** Math.max(0, failureCount)

  return Math.min(intervalMs * multiplier, maxIntervalMs)
}
