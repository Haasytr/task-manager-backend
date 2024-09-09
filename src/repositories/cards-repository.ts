import { Card, Prisma } from "@prisma/client";

export interface CardsRepository {
  create(data: Prisma.CardUncheckedCreateInput): Promise<Card>;
  findById(id: string): Promise<Card | null>;
  update(
    id: string,
    userId: string,
    data: Prisma.CardUncheckedUpdateInput,
  ): Promise<Card>;
  getByList(listId: string): Promise<Card[]>;
  delete(id: string, userId: string): Promise<void>;
}
