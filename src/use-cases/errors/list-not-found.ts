export class ListNotFoundError extends Error {
  constructor() {
    super("Failed to find list");
  }
}
