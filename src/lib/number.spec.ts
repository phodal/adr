import { test } from 'ava'
import { double } from 'adr'

test('double', t => {
  t.deepEqual(double(2), 4)
})
