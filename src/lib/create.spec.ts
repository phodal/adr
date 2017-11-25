let sinon = require('sinon')
let fs = require('fs')
let walkSync = require('walk-sync')

import { test } from 'ava'
import ADR from 'adr'
let Utils = ADR.Utils

test('ADR: create', t => {
  let consoleSpy = sinon.stub(console, 'log')
  let generateSpy = sinon.stub(ADR, 'generate')
  let fsWriteSyncSpy = sinon.stub(fs, 'writeFileSync')
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-编写完整的单元测试.md',
      basePath: './',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    }
  ])
  let fsExistSpy = sinon.stub(fs, 'existsSync').returns(true)
  let fsReadSpy = sinon.stub(fs, 'readFileSync').onCall(0).returns(JSON.stringify({
    path: '/test',
    language: 'en'
  }))
  .onCall(1).returns(`# {NUMBER}. {TITLE}

日期: {DATE}

## 状态

列表：提议/通过/完成/已弃用/已取代

{DATE} 提议`)

  let ADRGetSavePathSpy = sinon.stub(Utils, 'getSavePath').returns('./')

  ADR.create('create')
  // t.deepEqual(fsWriteSyncSpy.calledWith('./013-create.md'), true)
  t.deepEqual(fsReadSpy.callCount, 1)
  // fsWriteSyncSpy.restore()
  ADRGetSavePathSpy.restore()
  fsExistSpy.restore()
  fsReadSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
  generateSpy.restore()
})
