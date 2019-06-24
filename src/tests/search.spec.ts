let sinon = require('sinon')
let fs = require('fs')
let walkSync = require('walk-sync')
let findInFiles = require('find-in-files')

import test from 'ava'
import ADR from 'adr'

let Utils = ADR.Utils
let Config = ADR.Config

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
  let findSpy = sinon.stub(findInFiles, 'find').returns({
    then: cb => {
      cb({ 'docs/adr/001-filename.md': {} })
    }
  })
  let ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./')
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
    basePath: '/Users/fdhuang/learing/adr/docs/adr/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653 }
  ])

  ADR.search('测试')
  t.deepEqual(consoleSpy.calledWith(
    `╔════════════╤═══════════════════╗
║ 决策       │ 最后状态          ║
╟────────────┼───────────────────╢
║ 1.filename │ 2017-11-26 已完成 ║
╚════════════╧═══════════════════╝
`), true)
  findSpy.restore()
  ADRGetSavePathSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
  fsReadSpy.restore()
  i18nSpy.restore()
})
