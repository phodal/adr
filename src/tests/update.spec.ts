let sinon = require('sinon')
let fs = require('fs')
let walkSync = require('walk-sync')

import test from 'ava'

import ADR from 'adr'

let Config = ADR.Config

let mdTemplate = `# 1. 更友好的 CLI

日期: 2017-11-23

## 状态

列表：提议/通过/完成/已弃用/已取代

2017-11-23 提议
`

test('ADR: init in chinese', t => {
  let ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./')
  let fsWriteSpy = sinon.stub(fs, 'writeFileSync')
  let consoleSpy = sinon.stub(console, 'log')
  let renameSpy = sinon.stub(fs, 'renameSync')
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-DAF编写完整的单元测试.md',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    },
    {
      relativePath: '0000-tests.md',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    }
  ])
  let fsReadSpy = sinon.stub(fs, 'readFileSync')
  fsReadSpy
    .onCall(0).returns(mdTemplate)
    .onCall(2).returns(mdTemplate)
    .onCall(3).returns('{}')
    .onCall(1).returns(JSON.stringify({
      path: 'some'
    }))

  ADR.update()
  t.deepEqual(fsWriteSpy.callCount, 2)
  t.deepEqual(fsReadSpy.callCount, 2)
  t.deepEqual(renameSpy.callCount, 1)
  t.deepEqual(consoleSpy.calledWith('001-DAF编写完整的单元测试.md -> 0001-更友好的-cli.md'), true)
  fsWriteSpy.restore()
  fsReadSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
  renameSpy.restore()
  ADRGetSavePathSpy.restore()
})
