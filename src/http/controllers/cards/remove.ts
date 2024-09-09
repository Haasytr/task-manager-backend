import { ListNotFoundError } from "@/use-cases/errors/list-not-found";
import { makeDeleteCardUseCase } from "@/use-cases/factories/make-delete-card-use-case";
import { makeDeleteListUseCase } from "@/use-cases/factories/make-delete-list-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function remove(req: FastifyRequest, reply: FastifyReply) {
  const RemoveBodySchema = z.object({
    id: z.string(),
  });

  const { id } = RemoveBodySchema.parse(req.params);

  try {
    const deleteCardUseCase = makeDeleteCardUseCase();

    await deleteCardUseCase.execute({
      id,
      userId: req.user.sub,
    });

    return reply.status(204);
  } catch (err) {
    if (err instanceof ListNotFoundError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }
}
