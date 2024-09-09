import { ListNotFoundError } from "@/use-cases/errors/list-not-found";
import { makeUpdateCardUseCase } from "@/use-cases/factories/make-update-card-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(req: FastifyRequest, reply: FastifyReply) {
  const UpdateBodySchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    id: z.string(),
    finished: z.boolean(),
  });

  const { title, id, description, finished } = UpdateBodySchema.parse(req.body);

  try {
    const updateCardUseCase = makeUpdateCardUseCase();

    const { card } = await updateCardUseCase.execute({
      id,
      title,
      description,
      userId: req.user.sub,
      finished,
    });

    return reply.status(201).send(card);
  } catch (err) {
    if (err instanceof ListNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }
}
