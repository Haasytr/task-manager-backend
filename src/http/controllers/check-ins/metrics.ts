import { type FastifyRequest, type FastifyReply } from 'fastify'
import { makeGetUsermetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUsermetricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: req.user.sub,
  })

  return await reply.status(200).send({ checkInsCount })
}
