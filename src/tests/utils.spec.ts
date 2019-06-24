let sinon = require('sinon')
let fs = require('fs')
let walkSync = require('walk-sync')
let LRU = require('lru-cache')

import test from 'ava'
import ADR from 'adr'

let Utils = ADR.Utils
let Config = ADR.Config

test('generateFileName: test for Chinese utf-8', t => {
  let str = Utils.generateFileName('你無可奈何asd fsadf')
  t.deepEqual(str, '你無可奈何asd-fsadf')
})

test('generateFileName: test for newline', t => {
  let str = Utils.generateFileName('adr new fdsa \n ADR')
  t.deepEqual(str, 'adr-new-fdsa-adr')
})

test('getSavePath: when no exist config file', t => {
  let fsExistSpy = sinon.stub(fs, 'existsSync').returns(false)
  let fsReadSpy = sinon.stub(fs, 'readFileSync').returns(JSON.stringify({
    path: 'some'
  }))

  let dir = Config.getSavePath()
  t.deepEqual(dir.includes('docs/adr/'), true)
  fsExistSpy.restore()
  fsReadSpy.restore()
})

test('getSavePath: when exist config file', t => {
  let fsExistSpy = sinon.stub(fs, 'existsSync').returns(true)
  let cacheSpy = sinon.stub(LRU.prototype, 'get').returns({
    path: 'some-path'
  })
  let fsReadSpy = sinon.stub(fs, 'readFileSync').returns(JSON.stringify({
    path: 'some-path'
  }))

  let dir = Config.getSavePath()
  t.deepEqual(dir.indexOf('some-path') !== -1, true)
  fsExistSpy.restore()
  fsReadSpy.restore()
  cacheSpy.restore()
})

test('createIndexByNumber: should return correct pad', t => {
  let str = Utils.createIndexByNumber(1)
  t.deepEqual(str, '0001')
})

test('createIndexByNumber: should return correct pad', t => {
  let str = Utils.createIndexByNumber(11)
  t.deepEqual(str, '0011')
})

test('createIndexByNumber: should return correct pad', t => {
  let str = Utils.createIndexByNumber(999)
  t.deepEqual(str, '0999')
})

test('getLatestIndex: when exist config file', t => {
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-编写完整的单元测试.md',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    },
    {
      relativePath: 'README.md',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    }
  ])

  let lastNumber = Utils.getLatestIndex()
  t.deepEqual(1, lastNumber)
  entriesSpy.restore()
})

test('getNewNumber: when exist last number', t => {
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-编写完整的单元测试.md',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    },
    {
      relativePath: 'README.md',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    }
  ])

  let newIndexString = Utils.getNewIndexString()
  t.deepEqual('0002', newIndexString)
  entriesSpy.restore()
})

test('getNewNumber: when exist last number', t => {
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([])

  let newIndexString = Utils.getNewIndexString()
  t.deepEqual('0001', newIndexString)
  entriesSpy.restore()
})

test('getLanguage: should enable get language', t => {
  let fsExistSpy = sinon.stub(fs, 'existsSync').returns(true)
  let cacheSpy = sinon.stub(LRU.prototype, 'get').returns({
    path: 'some',
    language: 'test'
  })
  let fsReadSpy = sinon.stub(fs, 'readFileSync').returns(JSON.stringify({
    path: 'some',
    language: 'test'
  }))

  let language = Config.getLanguage() ? Config.getLanguage() : ''
  if (!language) language = ''
  t.deepEqual(language, 'test')
  fsExistSpy.restore()
  fsReadSpy.restore()
  cacheSpy.restore()
})

test('createDateString: should return correct date string', t => {
  let clock = sinon.useFakeTimers(new Date(2099,0,1))

  let language = Utils.createDateString()
  t.deepEqual(language, '2099-01-01')
  clock.restore()
})
