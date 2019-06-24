let sinon = require('sinon')
let walkSync = require('walk-sync')
let fs = require('fs')
let LRU = require('lru-cache')

import test from 'ava'
import ADR from 'adr'

let Config = ADR.Config

let adrTemplate = `# 1. 编写完整的单元测试

日期: 2017/11/22

## 状态

2017-11-22 提议
2017-11-26 已完成
`

let adrOptions = JSON.stringify({
  path: './',
  language: 'en'
})

test('ADR: export csv', t => {
  let ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./')
  let consoleSpy = sinon.stub(console, 'log')
  let fsWriteSpy = sinon.stub(fs, 'writeFileSync')
  let cacheSpy = sinon.stub(LRU.prototype, 'get').returns({
    path: 'some',
    language: 'zh-cn'
  })
  let fsReadSpy = sinon.stub(fs, 'readFileSync')
    .onCall(0).returns(JSON.stringify(adrOptions))
    .onCall(1).returns(JSON.stringify(adrOptions))
    .onCall(2).returns(JSON.stringify(adrOptions))
    .onCall(3).returns(adrTemplate)
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-编写完整的单元测试.md',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    }
  ])

  let results = ADR.output('csv')
  t.deepEqual(results,
`Index, 决策, 上次修改时间, 最后状态
1, 编写完整的单元测试, 2017-11-23, undefined
`)
  // t.deepEqual(fsWriteSpy.calledWith('./export.csv'), true)
  ADRGetSavePathSpy.restore()
  fsReadSpy.restore()
  fsWriteSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
  cacheSpy.restore()
})

test('ADR: export json', t => {
  let ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./')
  let consoleSpy = sinon.stub(console, 'log')
  let fsWriteSpy = sinon.stub(fs, 'writeFileSync')
  let fsReadSpy = sinon.stub(fs, 'readFileSync')
    .onCall(0).returns(JSON.stringify(adrOptions))
    .onCall(1).returns(JSON.stringify(adrOptions))
    .onCall(2).returns(JSON.stringify(adrOptions))
    .onCall(3).returns(adrTemplate)
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-编写完整的单元测试.md',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    }
  ])

  let results = ADR.output('json')
  t.deepEqual(results, `[{"index":1,"decision":"编写完整的单元测试","modifiedDate":"2017-11-23"}]`)
  // t.deepEqual(fsWriteSpy.calledWith('./export.csv'), true)
  ADRGetSavePathSpy.restore()
  fsReadSpy.restore()
  fsWriteSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
})

test('ADR: when export error', t => {
  let consoleSpy = sinon.stub(console, 'log')

  ADR.output('excel')
  t.deepEqual(consoleSpy.calledWith('\n error: type excel current not supported'), true)
  consoleSpy.restore()
})
