import { Card } from "@prisma/client";
import { CardsRepository } from "@/repositories/cards-repository";
import { ListsRepository } from "@/repositories/lists-repository";
import { ListNotFoundError } from "./errors/list-not-found";

interface CreateListUseCaseRequest {
  title: string;
  listId: string;
  description: string;
  userId: string;
}

interface CreateListUseCaseResponse {
  card: Card;
}

export class CreateCardUseCase {
  constructor(
    private cardsRepository: CardsRepository,
    private listsRepository: ListsRepository,
  ) {}

  async execute({
    title,
    listId,
    description,
    userId,
  }: CreateListUseCaseRequest): Promise<CreateListUseCaseResponse> {
    const listExists = await this.listsRepository.findByIdAndUserId(
      userId,
      listId,
    );

    if (!listExists) {
      throw new ListNotFoundError();
    }

    const card = await this.cardsRepository.create({
      title,
      listId,
      description,
    });

    return { card };
  }
}
