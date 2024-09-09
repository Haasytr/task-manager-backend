import { PrismaListsRepository } from "@/repositories/prisma/prisma-lists-repository";
import { GetCardUseCase } from "../get-card-by-list";
import { PrismaCardsRepository } from "@/repositories/prisma/prisma-cards-repository";

export function makeGetCardUseCase() {
  const cardsRepository = new PrismaCardsRepository();
  const listRepository = new PrismaListsRepository();

  const updateCardUseCase = new GetCardUseCase(cardsRepository, listRepository);

  return updateCardUseCase;
}
