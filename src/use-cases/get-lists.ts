import { List } from "@prisma/client";
import { ListsRepository } from "@/repositories/lists-repository";

interface GetListUseCaseRequest {
  userId: string;
}

interface GetListUseCaseResponse {
  lists: List[];
}

export class GetListUseCase {
  constructor(private listsRepository: ListsRepository) {}

  async execute({
    userId,
  }: GetListUseCaseRequest): Promise<GetListUseCaseResponse> {
    const lists = await this.listsRepository.list(userId);

    return { lists };
  }
}
