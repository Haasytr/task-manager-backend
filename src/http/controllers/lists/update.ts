import { ListNotFoundError } from "@/use-cases/errors/list-not-found";
import { makeCreateListUseCase } from "@/use-cases/factories/make-create-list-use-case";
import { makeUpdateListUseCase } from "@/use-cases/factories/make-update-list-use-case ";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(req: FastifyRequest, reply: FastifyReply) {
  const CreateBodySchema = z.object({
    title: z.string(),
    id: z.string(),
  });

  const { title, id } = CreateBodySchema.parse(req.body);

  try {
    const createListUseCase = makeUpdateListUseCase();

    const { list } = await createListUseCase.execute({
      id,
      title,
      userId: req.user.sign.sub,
    });

    return reply.status(201).send(list);
  } catch (err) {
    if (err instanceof ListNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }
}
