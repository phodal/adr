let sinon = require('sinon')
let fs = require('fs')
import { test } from 'ava'
import ADR from 'adr'

test('ADR: init', t => {
  let cwdSpy = sinon.stub(process, 'cwd').returns('/test')
  let fsWriteSpy = sinon.stub(fs, 'writeFileSync')

  ADR.init('en')
  t.deepEqual(fsWriteSpy.calledOnce, true)
  t.deepEqual(fsWriteSpy.calledWith('/test/.adr.json', JSON.stringify({ path: 'doc/ard/', language: 'en' })), true)
  cwdSpy.restore()
  fsWriteSpy.restore()
})
