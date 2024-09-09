import { PrismaListsRepository } from "@/repositories/prisma/prisma-lists-repository";
import { DeleteListUseCase } from "../delete-list";

export function makeDeleteListUseCase() {
  const listsRepository = new PrismaListsRepository();
  const deleteListUseCase = new DeleteListUseCase(listsRepository);

  return deleteListUseCase;
}
