import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryCardsRepository } from "@/repositories/in-memory/in-memory-cards-repository";
import { DeleteCardUseCase } from "./delete-card";

let cardsRepository: InMemoryCardsRepository;
let sut: DeleteCardUseCase;

describe("delete card Use Case", () => {
  beforeEach(() => {
    cardsRepository = new InMemoryCardsRepository();
    sut = new DeleteCardUseCase(cardsRepository);
  });
  it("should be able to delete card", async () => {
    const card = await cardsRepository.create({
      title: "exemple",
      listId: "123",
      description: "123",
    });

    await cardsRepository.create({
      title: "exemple",
      listId: "123",
      description: "123",
    });

    await sut.execute({ id: card.id, userId: "123" });

    const cards = await cardsRepository.getByList("123");

    expect(cards.length).toBe(1);
  });
});
