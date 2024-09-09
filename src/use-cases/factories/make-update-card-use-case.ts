import { UpdateCardUseCase } from "../update-card";
import { PrismaCardsRepository } from "@/repositories/prisma/prisma-cards-repository";

export function makeUpdateCardUseCase() {
  const cardsRepository = new PrismaCardsRepository();

  const updateCardUseCase = new UpdateCardUseCase(cardsRepository);

  return updateCardUseCase;
}
