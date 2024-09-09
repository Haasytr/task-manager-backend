import { PrismaListsRepository } from "@/repositories/prisma/prisma-lists-repository";
import { UpdateListUseCase } from "../update-list";

export function makeUpdateListUseCase() {
  const listsRepository = new PrismaListsRepository();
  const updateListUseCase = new UpdateListUseCase(listsRepository);

  return updateListUseCase;
}
