import { makeCreateCardUseCase } from "@/use-cases/factories/make-create-card-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const CreateBodySchema = z.object({
    title: z.string(),
    listId: z.string(),
    description: z.string(),
  });

  const { title, description, listId } = CreateBodySchema.parse(req.body);

  try {
    const createCardUseCase = makeCreateCardUseCase();

    const { card } = await createCardUseCase.execute({
      description,
      listId,
      title,
      userId: req.user.sign.sub,
    });

    return reply.status(201).send(card);
  } catch (err) {
    throw err;
  }
}
