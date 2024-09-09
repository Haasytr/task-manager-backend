import { PrismaListsRepository } from "@/repositories/prisma/prisma-lists-repository";
import { GetListUseCase } from "../get-lists";

export function makeGetListsUseCase() {
  const listsRepository = new PrismaListsRepository();
  const getListUseCase = new GetListUseCase(listsRepository);

  return getListUseCase;
}
