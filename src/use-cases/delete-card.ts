import { ListNotFoundError } from "./errors/list-not-found";
import { CardsRepository } from "@/repositories/cards-repository";

interface DeleteCardUseCaseRequest {
  userId: string;
  id: string;
}

export class DeleteCardUseCase {
  constructor(private cardsRepository: CardsRepository) {}

  async execute({ id, userId }: DeleteCardUseCaseRequest): Promise<void> {
    const cardExists = await this.cardsRepository.findById(id);

    if (!cardExists) {
      throw new ListNotFoundError();
    }

    await this.cardsRepository.delete(id, userId);
  }
}
