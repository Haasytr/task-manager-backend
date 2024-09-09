import { PrismaListsRepository } from "@/repositories/prisma/prisma-lists-repository";
import { CreateListUseCase } from "../create-list";

export function makeCreateListUseCase() {
  const listsRepository = new PrismaListsRepository();
  const createListUseCase = new CreateListUseCase(listsRepository);

  return createListUseCase;
}
