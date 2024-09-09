export class CardNotFoundError extends Error {
  constructor() {
    super("Failed to find card");
  }
}
