import { TestBed } from '@angular/core/testing'
import { EnvService } from './_services/env.service'

describe('EnvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: EnvService = TestBed.get(EnvService)
    expect(service).toBeTruthy()
  })
})
