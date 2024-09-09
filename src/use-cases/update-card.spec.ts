import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryCardsRepository } from "@/repositories/in-memory/in-memory-cards-repository";
import { UpdateCardUseCase } from "./update-card";
import { CardNotFoundError } from "./errors/card-not-found";

let cardsRepository: InMemoryCardsRepository;
let sut: UpdateCardUseCase;

describe("Update card Use Case", () => {
  beforeEach(() => {
    cardsRepository = new InMemoryCardsRepository();
    sut = new UpdateCardUseCase(cardsRepository);
  });
  it("should be able to update a card", async () => {
    const createdCard = await cardsRepository.create({
      title: "title",
      description: "description",
      listId: "123",
    });

    const { card } = await sut.execute({
      description: "new description",
      title: "new title",
      id: createdCard.id,
      userId: "123",
    });

    expect(card.title).toBe("new title");
  });

  it("should not be able to update unknown list", async () => {
    await expect(
      sut.execute({
        title: "new title",
        description: "new description",
        id: "123",
        userId: "123",
      }),
    ).rejects.toBeInstanceOf(CardNotFoundError);
  });
});
