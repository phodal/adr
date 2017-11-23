let sinon = require('sinon')
let fs = require('fs')
import { test } from 'ava'
import ADR from 'adr'

let Utils = ADR.Utils

test('generateFileName: test for Chinese utf-8', t => {
  let str = Utils.generateFileName('你無可奈何asd fsadf')
  t.deepEqual(str, '你無可奈何asd-fsadf')
})

test('generateFileName: test for newline', t => {
  let str = Utils.generateFileName('adr new fdsa \n ADR')
  t.deepEqual(str, 'adr-new-fdsa-adr')
})

test('createIndexByNumber: should return correct pad', t => {
  let str = Utils.createIndexByNumber(1)
  t.deepEqual(str, '001')
})

test('createIndexByNumber: should return correct pad', t => {
  let str = Utils.createIndexByNumber(11)
  t.deepEqual(str, '011')
})

test('getSavePath: when no exist config file', t => {
  let fsExistSpy = sinon.stub(fs, 'existsSync').returns(false)
  let fsReadSpy = sinon.stub(fs, 'readFileSync').returns(JSON.stringify({
    path: 'some'
  }))

  let dir = Utils.getSavePath() ? Utils.getSavePath() : ''
  if (!dir) dir = ''
  t.deepEqual(dir.includes('/doc/adr/'), true)
  fsExistSpy.restore()
  fsReadSpy.restore()
})

test('getSavePath: when exist config file', t => {
  let fsExistSpy = sinon.stub(fs, 'existsSync').returns(true)
  let fsReadSpy = sinon.stub(fs, 'readFileSync').returns(JSON.stringify({
    path: 'some-path'
  }))

  let dir = Utils.getSavePath() ? Utils.getSavePath() : ''
  if (!dir) dir = ''
  t.deepEqual(dir.indexOf('some-path') > -1, true)
  fsExistSpy.restore()
  fsReadSpy.restore()
})
