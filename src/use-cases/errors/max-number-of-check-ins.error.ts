export class MaxNUmberOfCheckInsError extends Error {
  constructor() {
    super('Reached limit of check ins')
  }
}
