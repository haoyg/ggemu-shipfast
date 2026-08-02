export class LatestRequestGuard {
  private sequence = 0

  begin() {
    this.sequence += 1
    return this.sequence
  }

  invalidate() {
    this.sequence += 1
  }

  isLatest(requestSequence: number) {
    return requestSequence === this.sequence
  }
}
