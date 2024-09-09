import { Card } from "@prisma/client";
import { CardsRepository } from "@/repositories/cards-repository";
import { CardNotFoundError } from "./errors/card-not-found";

interface UpdateCardUseCaseRequest {
  title?: string;
  description?: string;
  finished?: boolean;
  id: string;
  userId: string;
}

interface UpdateCardUseCaseResponse {
  card: Card;
}

export class UpdateCardUseCase {
  constructor(private cardsRepository: CardsRepository) {}

  async execute({
    description,
    id,
    userId,
    title,
    finished,
  }: UpdateCardUseCaseRequest): Promise<UpdateCardUseCaseResponse> {
    const cardExists = await this.cardsRepository.findById(id);

    if (!cardExists) {
      throw new CardNotFoundError();
    }

    const card = await this.cardsRepository.update(id, userId, {
      description,
      title,
      finished,
    });

    return { card };
  }
}
