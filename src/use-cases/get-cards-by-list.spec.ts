import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryListsRepository } from "@/repositories/in-memory/in-memory-lists-repository";
import { ListNotFoundError } from "./errors/list-not-found";
import { InMemoryCardsRepository } from "@/repositories/in-memory/in-memory-cards-repository";
import { GetCardUseCase } from "./get-card-by-list";

let listsRepository: InMemoryListsRepository;
let cardsRepository: InMemoryCardsRepository;
let sut: GetCardUseCase;

describe("get cards by list Use Case", () => {
  beforeEach(() => {
    listsRepository = new InMemoryListsRepository();
    cardsRepository = new InMemoryCardsRepository();
    sut = new GetCardUseCase(cardsRepository, listsRepository);
  });
  it("should be able to get lists", async () => {
    const list = await listsRepository.create({
      title: "exemple",
      userId: "123",
    });

    await cardsRepository.create({
      title: "card-1",
      description: "card-1",
      listId: list.id,
    });

    await cardsRepository.create({
      title: "card-2",
      description: "card-2",
      listId: list.id,
    });

    const { cards } = await sut.execute({
      listId: list.id,
      userId: "123",
    });

    expect(cards.length).toBe(2);
  });

  it("should not be able to get cards of invalid list", async () => {
    await expect(
      sut.execute({
        listId: "123",
        userId: "123",
      }),
    ).rejects.toBeInstanceOf(ListNotFoundError);
  });
});
