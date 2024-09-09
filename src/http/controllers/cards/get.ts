import { makeGetCardUseCase } from "@/use-cases/factories/make-get-card-use-case";
import { makeGetListsUseCase } from "@/use-cases/factories/make-get-lists-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function get(req: FastifyRequest, reply: FastifyReply) {
  try {
    const GetBodySchema = z.object({
      listId: z.string(),
    });

    const { listId } = GetBodySchema.parse(req.body);

    const getCardsUseCase = makeGetCardUseCase();

    const { cards } = await getCardsUseCase.execute({
      listId,
      userId: req.user.sub,
    });

    return reply.status(201).send(cards);
  } catch (err) {
    throw err;
  }
}
