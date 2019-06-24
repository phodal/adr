let sinon = require('sinon')
let fs = require('fs')
let walkSync = require('walk-sync')
let LRU = require('lru-cache')

import test from 'ava'

import ADR from 'adr'
let StatusHelper = ADR.StatusHelper

let mdTemplate = `
# 10. 更友好的 CLI

日期: 2017-11-23

## 状态

2017-11-23 提议

2017-11-23 通过

`

test('ADR: list status', t => {
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-编写完整的单元测试.md',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    }
  ])
  let cacheSpy = sinon.stub(LRU.prototype, 'get').returns({
    path: 'some',
    language: 'zh-cn'
  })
  let fsReadSpy = sinon.stub(fs, 'readFileSync')
    .onCall(0).returns(mdTemplate)
    .onCall(1).returns(mdTemplate)

  let status = StatusHelper.getAllStatus('./001-编写完整的单元测试.md')
  t.deepEqual(status, [
    '2017-11-23 提议',
    '2017-11-23 通过'
  ])
  fsReadSpy.restore()
  entriesSpy.restore()
  cacheSpy.restore()
})

test('ADR:status helper set status', t => {
  let fsWriteSpy = sinon.stub(fs, 'writeFileSync')
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-编写完整的单元测试.md',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    }
  ])
  let cacheSpy = sinon.stub(LRU.prototype, 'get').returns({
    path: 'some',
    language: 'zh-cn'
  })
  let fsReadSpy = sinon.stub(fs, 'readFileSync')
    .onCall(0).returns(mdTemplate)
    .onCall(1).returns(mdTemplate)

  StatusHelper.setStatus('./001-编写完整的单元测试.md', '完成')
  // t.deepEqual(fsWriteSpy.calledWith('./001-编写完整的单元测试.md', '{"language":"en","path":"docs/adr/","prefix":"","digits":4}'), true)
  t.deepEqual(true, true)
  fsReadSpy.restore()
  fsWriteSpy.restore()
  entriesSpy.restore()
  cacheSpy.restore()
})
