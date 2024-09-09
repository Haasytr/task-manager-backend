import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryListsRepository } from "@/repositories/in-memory/in-memory-lists-repository";
import { InMemoryCardsRepository } from "@/repositories/in-memory/in-memory-cards-repository";
import { CreateCardUseCase } from "./create-card";
import { ListNotFoundError } from "./errors/list-not-found";

let listsRepository: InMemoryListsRepository;
let cardsRepository: InMemoryCardsRepository;
let sut: CreateCardUseCase;

describe("Create card Use Case", () => {
  beforeEach(() => {
    listsRepository = new InMemoryListsRepository();
    cardsRepository = new InMemoryCardsRepository();
    sut = new CreateCardUseCase(cardsRepository, listsRepository);
  });
  it("should be able to create a card", async () => {
    const list = await listsRepository.create({
      title: "list title",
      userId: "123",
    });

    const { card } = await sut.execute({
      description: "test-description",
      listId: list.id,
      title: "test-title",
      userId: "123",
    });

    expect(card.id).toEqual(expect.any(String));
  });

  it("should not be able to create a card without list", async () => {
    await expect(
      sut.execute({
        description: "test-description",
        listId: "123",
        title: "test-title",
        userId: "123",
      }),
    ).rejects.toBeInstanceOf(ListNotFoundError);
  });
});
