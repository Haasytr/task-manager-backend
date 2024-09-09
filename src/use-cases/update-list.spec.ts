import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryListsRepository } from "@/repositories/in-memory/in-memory-lists-repository";
import { ListNotFoundError } from "./errors/list-not-found";
import { UpdateListUseCase } from "./update-list";

let listsRepository: InMemoryListsRepository;
let sut: UpdateListUseCase;

describe("Update list Use Case", () => {
  beforeEach(() => {
    listsRepository = new InMemoryListsRepository();
    sut = new UpdateListUseCase(listsRepository);
  });
  it("should be able to update a list", async () => {
    const listToBeUpdated = await listsRepository.create({
      title: "title",
      userId: "123",
    });

    const { list } = await sut.execute({
      title: "new title",
      id: listToBeUpdated.id,
      userId: "123",
    });

    expect(list.title).toBe("new title");
  });

  it("should not be able to update unknown list", async () => {
    await expect(
      sut.execute({
        title: "new title",
        id: "123",
        userId: "123",
      }),
    ).rejects.toBeInstanceOf(ListNotFoundError);
  });
});
