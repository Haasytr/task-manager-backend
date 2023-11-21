import { expect, describe, it, beforeEach, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { afterEach } from 'node:test'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let CheckInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in use case', () => {
  beforeEach(async () => {
    CheckInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(CheckInsRepository)

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useFakeTimers()
  })

  it('it should be able to validate the check-in', async () => {
    const createdCheckIn = await CheckInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(CheckInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an existent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'Inexistente-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  it('Should not be able to validate te check-in after 20 minutes after its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await CheckInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).toBeInstanceOf(LateCheckInValidationError)
  })
})
