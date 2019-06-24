let sinon = require('sinon')
let fs = require('fs')
let walkSync = require('walk-sync')
let colors = require('colors/safe')
import test from 'ava'
import ADR from 'adr'

let Utils = ADR.Utils
let Config = ADR.Config

let adrTemplate = `# 1. 编写单元测试

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
    relativePath: '0001-filename.md',
    basePath: '/adr/docs/adr/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653 }
  ])

  let results = ADR.list()
  t.deepEqual(results, `╔════════════════╤══════════════╤═══════════════════╗
║ 决策           │ 上次修改时间 │ 最后状态          ║
╟────────────────┼──────────────┼───────────────────╢
║ 1.编写单元测试 │ 2017-11-23   │ ${colors['green']('2017-11-26 已完成')} ║
╚════════════════╧══════════════╧═══════════════════╝
`)
  ADRGetSavePathSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
  fsReadSpy.restore()
  i18nSpy.restore()
})
