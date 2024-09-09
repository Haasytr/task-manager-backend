import { List } from "@prisma/client";
import { ListsRepository } from "@/repositories/lists-repository";
import { ListNotFoundError } from "./errors/list-not-found";

interface UpdateListUseCaseRequest {
  id: string;
  title: string;
  userId: string;
}

interface UpdateListUseCaseResponse {
  list: List;
}

export class UpdateListUseCase {
  constructor(private listsRepository: ListsRepository) {}

  async execute({
    title,
    id,
    userId,
  }: UpdateListUseCaseRequest): Promise<UpdateListUseCaseResponse> {
    const listExists = await this.listsRepository.findById(id);

    if (!listExists) {
      throw new ListNotFoundError();
    }

    const list = await this.listsRepository.update(id, title, userId);

    return { list };
  }
}
