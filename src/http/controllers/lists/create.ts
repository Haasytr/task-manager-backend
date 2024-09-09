import { makeCreateListUseCase } from "@/use-cases/factories/make-create-list-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const CreateBodySchema = z.object({
    title: z.string(),
  });

  console.log(req.user.sign.sub);

  const { title } = CreateBodySchema.parse(req.body);

  try {
    const createListUseCase = makeCreateListUseCase();

    const { list } = await createListUseCase.execute({
      title,
      userId: req.user.sign.sub,
    });

    return reply.status(201).send(list);
  } catch (err) {
    return reply.status(500).send(err);
  }
}
