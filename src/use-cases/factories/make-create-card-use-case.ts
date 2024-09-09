import { PrismaListsRepository } from "@/repositories/prisma/prisma-lists-repository";
import { PrismaCardsRepository } from "@/repositories/prisma/prisma-cards-repository";
import { CreateCardUseCase } from "../create-card";

export function makeCreateCardUseCase() {
  const cardsRepository = new PrismaCardsRepository();
  const listRepository = new PrismaListsRepository();
  const createCardUseCase = new CreateCardUseCase(
    cardsRepository,
    listRepository,
  );

  return createCardUseCase;
}
