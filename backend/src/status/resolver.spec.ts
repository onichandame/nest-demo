import { Test } from '@nestjs/testing'

import { StatusResolver } from './resolver'

describe(StatusResolver.name, () => {
  let resolver: StatusResolver

  beforeEach(async done => {
    const module = await Test.createTestingModule({
      providers: [StatusResolver],
    }).compile()
    resolver = module.get<StatusResolver>(StatusResolver)
    done()
  })

  test(`should be defined`, () => expect(resolver).toBeDefined())

  test(`readiness should return OK`, () =>
    expect(resolver.readiness()).toEqual(`OK`))
})
