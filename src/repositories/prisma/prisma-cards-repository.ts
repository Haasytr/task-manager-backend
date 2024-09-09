import { Prisma, Card } from "@prisma/client";
import { CardsRepository } from "../cards-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCardsRepository implements CardsRepository {
  async create(data: Prisma.CardUncheckedCreateInput): Promise<Card> {
    const card = await prisma.card.create({
      data: {
        title: data.title,
        listId: data.listId,
        description: data.description,
      },
    });

    return card;
  }
  async findById(id: string): Promise<Card | null> {
    const card = await prisma.card.findUnique({
      where: {
        id,
      },
    });

    return card;
  }
  async update(
    id: string,
    userId: string,
    data: Prisma.CardUncheckedUpdateInput,
  ): Promise<Card> {
    const card = await prisma.card.update({
      where: {
        id: id,
        list: {
          userId,
        },
      },
      data: {
        ...data,
      },
    });

    return card;
  }
  async getByList(listId: string): Promise<Card[]> {
    const cards = await prisma.card.findMany({
      where: {
        list: {
          id: listId,
        },
      },
    });

    return cards;
  }
  async delete(id: string, userId: string): Promise<void> {
    await prisma.card.delete({
      where: {
        id,
        list: {
          userId,
        },
      },
    });
  }
}
