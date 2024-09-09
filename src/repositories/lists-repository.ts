import { List, Prisma } from "@prisma/client";

export interface ListsRepository {
  create(data: Prisma.ListUncheckedCreateInput): Promise<List>;
  findById(id: string): Promise<List | null>;
  update(id: string, title: string, userId: string): Promise<List>;
  list(userId: string): Promise<List[]>;
  findByIdAndUserId(userId: string, id: string): Promise<List | null>;
  delete(id: string, userId: string): Promise<void>;
}
