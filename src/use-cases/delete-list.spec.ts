import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryListsRepository } from "@/repositories/in-memory/in-memory-lists-repository";
import { DeleteListUseCase } from "./delete-list";

let listsRepository: InMemoryListsRepository;
let sut: DeleteListUseCase;

describe("Delete list Use Case", () => {
  beforeEach(() => {
    listsRepository = new InMemoryListsRepository();
    sut = new DeleteListUseCase(listsRepository);
  });
  it("should be able to delete list", async () => {
    const list = await listsRepository.create({
      title: "exemple",
      userId: "123",
    });

    await listsRepository.create({
      title: "exemple 2",
      userId: "123",
    });

    await sut.execute({ id: list.id, userId: "123" });

    const lists = await listsRepository.list("123");

    expect(lists.length).toBe(1);
  });
});
