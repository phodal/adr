let sinon = require('sinon')
let fs = require('fs')
let walkSync = require('walk-sync')
import { test } from 'ava'
import ADR from 'adr'

let Utils = ADR.Utils

test('ADR: list', t => {
  let ADRGetSavePathSpy = sinon.stub(Utils, 'getSavePath').returns('./')
  let consoleSpy = sinon.stub(console, 'log')
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-编写完整的单元测试.md',
    basePath: '/Users/fdhuang/learing/adr/doc/ard/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653 }
  ])

  let results = ADR.list()
  t.deepEqual(results,
`╔══════════════════════╤══════════════╗
║ 决策                 │ 上次修改时间 ║
╟──────────────────────┼──────────────╢
║ 1.编写完整的单元测试 │ 2017-11-23   ║
╚══════════════════════╧══════════════╝
`)
  ADRGetSavePathSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
})

test('ADR: list with README.md', t => {
  let ADRGetSavePathSpy = sinon.stub(Utils, 'getSavePath').returns('./')
  let consoleSpy = sinon.stub(console, 'log')
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([{
    relativePath: '001-编写完整的单元测试.md',
    basePath: '/Users/fdhuang/learing/adr/doc/ard/',
    mode: 33188,
    size: 246,
    mtime: 1511435254653 },
    {
      relativePath: 'README.md',
      basePath: '/Users/fdhuang/learing/adr/doc/ard/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653 }
  ])

  let results = ADR.list()
  t.deepEqual(results,
`╔══════════════════════╤══════════════╗
║ 决策                 │ 上次修改时间 ║
╟──────────────────────┼──────────────╢
║ 1.编写完整的单元测试 │ 2017-11-23   ║
╚══════════════════════╧══════════════╝
`)
  ADRGetSavePathSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
})
