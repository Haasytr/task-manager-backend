import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryListsRepository } from "@/repositories/in-memory/in-memory-lists-repository";
import { GetListUseCase } from "./get-lists";

let listsRepository: InMemoryListsRepository;
let sut: GetListUseCase;

describe("get list Use Case", () => {
  beforeEach(() => {
    listsRepository = new InMemoryListsRepository();
    sut = new GetListUseCase(listsRepository);
  });
  it("should be able to get lists", async () => {
    await listsRepository.create({
      title: "exemple",
      userId: "123",
    });

    await listsRepository.create({
      title: "exemple 2",
      userId: "123",
    });

    const { lists } = await sut.execute({
      userId: "123",
    });

    expect(lists.length).toBe(2);
  });
});
