import { expect, describe, it, beforeEach, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNUmberOfCheckInsError } from './errors/max-number-of-check-ins.error'
import { MaxDistanceError } from './errors/max-distance-error'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in use case', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(inMemoryCheckInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript gym',
      description: '',
      latitude: -23.5690668,
      longitude: -47.9831247,
      phone: '15555',
    })
  })
  it('it should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5690668,
      userLongitude: -47.9831247,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in twice in the same', async () => {
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5690668,
      userLongitude: -47.9831247,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.5690668,
        userLongitude: -47.9831247,
      }),
    ).rejects.toBeInstanceOf(MaxNUmberOfCheckInsError)
  })

  it('should be able to check in twice in diffent days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5690668,
      userLongitude: -47.9831247,
    })

    vi.setSystemTime(new Date(2023, 0, 22, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5690668,
      userLongitude: -47.9831247,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  // @-23.5942639,-48.0505933,
  // @-23.5690668,-47.9831247
  it('it should not be able to check in a distance gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Javascript gym',
      description: '',
      latitude: new Decimal(-23.5942639),
      longitude: new Decimal(-47.9831247),
      phone: '15555',
    })

    expect(
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.5690668,
        userLongitude: -47.9831247,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
