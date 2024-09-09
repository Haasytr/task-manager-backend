import { prisma } from "@/lib/prisma";
import { List, Prisma } from "@prisma/client";
import { ListsRepository } from "../lists-repository";

export class PrismaListsRepository implements ListsRepository {
  async create(data: Prisma.ListUncheckedCreateInput): Promise<List> {
    const list = await prisma.list.create({
      data,
    });

    return list;
  }
  async findById(id: string): Promise<List | null> {
    const list = await prisma.list.findUnique({
      where: {
        id,
      },
    });

    return list;
  }
  async update(id: string, title: string, userId: string): Promise<List> {
    const list = await prisma.list.update({
      where: {
        id,
        userId,
      },
      data: {
        title,
      },
    });

    return list;
  }
  async list(userId: string): Promise<List[]> {
    const lists = await prisma.list.findMany({
      where: {
        userId,
      },
      include: {
        cards: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return lists;
  }
  async delete(id: string, userId: string): Promise<void> {
    await prisma.list.delete({
      where: {
        id,
        userId,
      },
    });
  }

  async findByIdAndUserId(userId: string, id: string): Promise<List | null> {
    const list = prisma.list.findUnique({
      where: {
        id,
        userId,
      },
    });

    return list;
  }
}
