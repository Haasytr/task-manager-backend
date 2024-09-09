import { Card } from "@prisma/client";
import { CardsRepository } from "@/repositories/cards-repository";
import { ListsRepository } from "@/repositories/lists-repository";
import { ListNotFoundError } from "./errors/list-not-found";

interface GetCardUseCaseRequest {
  listId: string;
  userId: string;
}

interface GetCardUseCaseResponse {
  cards: Card[];
}

export class GetCardUseCase {
  constructor(
    private cardsRepository: CardsRepository,
    private listsRepository: ListsRepository,
  ) {}

  async execute({
    listId,
    userId,
  }: GetCardUseCaseRequest): Promise<GetCardUseCaseResponse> {
    const listExists = await this.listsRepository.findByIdAndUserId(
      userId,
      listId,
    );

    if (!listExists) {
      throw new ListNotFoundError();
    }

    const cards = await this.cardsRepository.getByList(listId);

    return { cards };
  }
}
