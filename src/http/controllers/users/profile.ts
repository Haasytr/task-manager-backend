import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { type FastifyRequest, type FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: req.user.sub,
  })

  return await reply.status(200).send({
    profile: {
      ...user,
      password_hash: undefined,
    },
  })
}
