import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryListsRepository } from "@/repositories/in-memory/in-memory-lists-repository";
import { CreateListUseCase } from "./create-list";

let listsRepository: InMemoryListsRepository;
let sut: CreateListUseCase;

describe("Create list Use Case", () => {
  beforeEach(() => {
    listsRepository = new InMemoryListsRepository();
    sut = new CreateListUseCase(listsRepository);
  });
  it("should be able to create a list", async () => {
    const { list } = await sut.execute({
      title: "list title",
      userId: "123",
    });

    expect(list.id).toEqual(expect.any(String));
  });
});
