import { List } from "@prisma/client";
import { ListsRepository } from "@/repositories/lists-repository";

interface CreateListUseCaseRequest {
  title: string;
  userId: string;
}

interface CreateListUseCaseResponse {
  list: List;
}

export class CreateListUseCase {
  constructor(private listsRepository: ListsRepository) {}

  async execute({
    title,
    userId,
  }: CreateListUseCaseRequest): Promise<CreateListUseCaseResponse> {
    const list = await this.listsRepository.create({ title, userId });

    return { list };
  }
}
