import { makeGetListsUseCase } from "@/use-cases/factories/make-get-lists-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function get(req: FastifyRequest, reply: FastifyReply) {
  try {
    const createListUseCase = makeGetListsUseCase();

    const { lists } = await createListUseCase.execute({
      userId: req.user.sign.sub,
    });

    return reply.status(201).send(lists);
  } catch (err) {
    throw err;
  }
}
