import { Card, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

import { CardsRepository } from "../cards-repository";
import { CardNotFoundError } from "@/use-cases/errors/card-not-found";

export class InMemoryCardsRepository implements CardsRepository {
  public items: Card[] = [];

  async create(data: Prisma.CardUncheckedCreateInput): Promise<Card> {
    const card = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      listId: data.listId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(card);

    return card;
  }
  async findById(id: string): Promise<Card | null> {
    const card = this.items.find((item) => item.id === id);

    if (!card) {
      return null;
    }

    return card;
  }
  async update(
    id: string,
    userId: string,
    data: Prisma.CardUncheckedUpdateInput,
  ): Promise<Card> {
    const card = this.items.find((item) => item.id == id);

    if (!card) {
      throw new CardNotFoundError();
    }

    if (data.title) {
      card.title = String(data.title);
    }

    if (data.description) {
      card.description = String(data.description);
    }

    return card;
  }

  async getByList(listId: string): Promise<Card[]> {
    const cards = this.items.filter((item) => item.listId == listId);

    return cards;
  }

  async delete(id: string, listId: string): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id === id && item.listId == listId,
    );
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
