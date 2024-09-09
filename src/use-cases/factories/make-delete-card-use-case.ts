import { DeleteCardUseCase } from "../delete-card";
import { UpdateCardUseCase } from "../update-card";
import { PrismaCardsRepository } from "@/repositories/prisma/prisma-cards-repository";

export function makeDeleteCardUseCase() {
  const cardsRepository = new PrismaCardsRepository();

  const deleteCardUseCase = new DeleteCardUseCase(cardsRepository);

  return deleteCardUseCase;
}
