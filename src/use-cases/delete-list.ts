import { ListsRepository } from "@/repositories/lists-repository";
import { ListNotFoundError } from "./errors/list-not-found";

interface DeleteListUseCaseRequest {
  id: string;
  userId: string;
}

export class DeleteListUseCase {
  constructor(private listsRepository: ListsRepository) {}

  async execute({ id, userId }: DeleteListUseCaseRequest): Promise<void> {
    const listExists = await this.listsRepository.findById(id);

    if (!listExists) {
      throw new ListNotFoundError();
    }

    await this.listsRepository.delete(id, userId);
  }
}
