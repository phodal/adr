let sinon = require('sinon')
let fs = require('fs')

import test from 'ava'
import ADR from 'adr'

test('ADR: init in chinese', t => {
  let cwdSpy = sinon.stub(process, 'cwd').returns('/test')
  let fsWriteSpy = sinon.stub(fs, 'writeFileSync')

  ADR.init('chinese')
  t.deepEqual(fsWriteSpy.calledOnce, true)
  t.deepEqual(fsWriteSpy.calledWith('/test/.adr.json', '{"language":"zh-cn","path":"docs/adr/","prefix":"","digits":4}'), true)
  cwdSpy.restore()
  fsWriteSpy.restore()
})

test('ADR: init en', t => {
  let cwdSpy = sinon.stub(process, 'cwd').returns('/test')
  let fsWriteSpy = sinon.stub(fs, 'writeFileSync')

  ADR.init('en')
  t.deepEqual(fsWriteSpy.calledOnce, true)
  t.deepEqual(fsWriteSpy.calledWith('/test/.adr.json', '{"language":"en","path":"docs/adr/","prefix":"","digits":4}'), true)
  cwdSpy.restore()
  fsWriteSpy.restore()
})
