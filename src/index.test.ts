import { of } from 'rxjs'

import { async, spawn } from '.'

/** @test {async} */
describe('async', () => {
  it('should step through yielded observables', done => {
    const f = async(function*(d) {
      const a = yield ['a']
      const b = yield of('b')
      const c = yield Promise.resolve('c')
      return a + b + c + d
    })
    const observable = f('d')
    observable.subscribe(x => {
      expect(x).toEqual('abcd')
      done()
    })
  })
})

/** @test {spawn} */
describe('spawn', () => {
  it('should step through yielded observables', done => {
    const spawned = spawn(function*() {
      const a = yield ['a']
      const b = yield of('b')
      const c = yield Promise.resolve('c')
      return a + b + c
    })
    spawned.subscribe(x => {
      expect(x).toEqual('abc')
      done()
    })
  })
})
