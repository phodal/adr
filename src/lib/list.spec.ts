let sinon = require('sinon')
let fs = require('fs')
let walkSync = require('walk-sync')
import { test } from 'ava'
import ADR from 'adr'

let Utils = ADR.Utils

let adrTemplate = `# 1. 编写完整的单元测试

日期: 2017/11/22

## 状态

2017-11-22 提议

2017-11-26 已完成
`

let adrOptions = JSON.stringify({
  path: './',
  language: 'zh-cn'
})

test('ADR: list', t => {
  let ADRGetSavePathSpy = sinon.stub(Utils, 'getSavePath').returns('./')
  let i18nSpy = sinon.stub(Utils, 'getI18n').returns({
    decision: '决策',
    modifiedDate: '上次修改时间',
    lastStatus: '最后状态',
    logSavePath: '保存路径：'
  })
  let consoleSpy = sinon.stub(console, 'log')
  let fsReadSpy = sinon.stub(fs, 'readFileSync')
    .onCall(0).returns(adrTemplate)
    .onCall(1).returns(adrTemplate)
    .onCall(2).returns(JSON.stringify(adrOptions))
    .onCall(3).returns(JSON.stringify(adrOptions))
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-filename.md',
    basePath: '/Users/fdhuang/learing/adr/doc/adr/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653 }
  ])

  let results = ADR.list()
  t.deepEqual(results,
`╔══════════════════════╤══════════════╤═══════════╗
║ 决策                 │ 上次修改时间 │ 最后状态  ║
╟──────────────────────┼──────────────┼───────────╢
║ 1.编写完整的单元测试 │ 2017-11-23   │           ║
╚══════════════════════╧══════════════╧═══════════╝
`)
  ADRGetSavePathSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
  fsReadSpy.restore()
  i18nSpy.restore()
})

test('ADR: list with README.md', t => {
  let i18nSpy = sinon.stub(Utils, 'getI18n').returns({
    decision: '决策',
    modifiedDate: '上次修改时间',
    lastStatus: '最后状态',
    logSavePath: '保存路径：'
  })
  let consoleSpy = sinon.stub(console, 'log')
  let fsReadSpy = sinon.stub(fs, 'readFileSync')
    .onCall(0).returns(JSON.stringify(adrOptions))
    .onCall(1).returns(adrTemplate)
    .onCall(2).returns(adrTemplate)
    .onCall(3).returns(JSON.stringify(adrOptions))
    .onCall(4).returns(adrTemplate)
    .onCall(5).returns(adrTemplate)
    .onCall(6).returns(adrTemplate)
    .onCall(7).returns(adrTemplate)
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-编写完整的单元测试.md',
    basePath: '/Users/fdhuang/learing/adr/doc/adr/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653 },
    {
      relativePath: 'README.md',
      basePath: '/Users/fdhuang/learing/adr/doc/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653 }
  ])

  let results = ADR.list()
  t.deepEqual(results,
`╔══════════════════════╤══════════════╤═══════════════════╗
║ 决策                 │ 上次修改时间 │ 最后状态          ║
╟──────────────────────┼──────────────┼───────────────────╢
║ 1.编写完整的单元测试 │ 2017-11-23   │ 2017-11-26 已完成 ║
╚══════════════════════╧══════════════╧═══════════════════╝
`)
  i18nSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
  fsReadSpy.restore()
})
