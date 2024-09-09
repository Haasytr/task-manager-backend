import { List, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ListsRepository } from "../lists-repository";
import { ListNotFoundError } from "@/use-cases/errors/list-not-found";

export class InMemoryListsRepository implements ListsRepository {
  public items: List[] = [];

  async create(data: Prisma.ListUncheckedCreateInput): Promise<List> {
    const list = {
      id: randomUUID(),
      title: data.title,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(list);

    return list;
  }

  async update(id: string, title: string, userId: string): Promise<List> {
    const userLists = this.items.filter((item) => item.userId == userId);
    const list = userLists.find((item) => item.id === id);

    if (!list) {
      throw new ListNotFoundError();
    }

    list.title = title;

    return list;
  }

  async findById(id: string): Promise<List | null> {
    const list = this.items.find((item) => item.id === id);

    if (!list) {
      return null;
    }

    return list;
  }

  async list(userId: string): Promise<List[]> {
    const list = this.items.filter((item) => item.userId === userId);

    return list;
  }

  async delete(id: string, userId: string): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id === id && item.userId == userId,
    );
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
  async findByIdAndUserId(userId: string, id: string): Promise<List | null> {
    const list = this.items.find(
      (item) => item.id === id && item.userId == userId,
    );

    if (!list) {
      return null;
    }

    return list;
  }
}
