let sinon = require('sinon')
let fs = require('fs')
let walkSync = require('walk-sync')

import test from 'ava'

import ADR from '../index'

let Config = ADR.Config

let mdTemplateCn = `# 1. 更友好的 CLI

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
    .onCall(0).returns(mdTemplateCn)
    .onCall(2).returns(mdTemplateCn)
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

let mdTemplateJp = `# 1. Foo は Bar ではなく Baz で管理する

年月日: 2017-11-23

## ステータス

リスト：提案中/承認済/完了/非推奨/更新済

2017-11-23 提案中
`

test('ADR: init in japanese', t => {
  let getForceNfcStub = sinon.stub(Config, 'getForceNfc').returns(true)
  let ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./')
  let fsWriteSpy = sinon.stub(fs, 'writeFileSync')
  let consoleSpy = sinon.stub(console, 'log')
  let renameSpy = sinon.stub(fs, 'renameSync')
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-foo-は-bar-ではなく-baz-で管理する.md',
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
    .onCall(0).returns(mdTemplateJp)
    .onCall(2).returns(mdTemplateJp)
    .onCall(3).returns('{}')
    .onCall(1).returns(JSON.stringify({
      path: 'some'
    }))

  ADR.update()
  t.deepEqual(fsWriteSpy.callCount, 2)
  t.deepEqual(fsReadSpy.callCount, 2)
  t.deepEqual(renameSpy.callCount, 1)
  t.deepEqual(consoleSpy.calledWith('001-foo-は-bar-ではなく-baz-で管理する.md -> 0001-foo-は-bar-ではなく-baz-で管理する.md'), true)
  fsWriteSpy.restore()
  fsReadSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
  renameSpy.restore()
  ADRGetSavePathSpy.restore()
  getForceNfcStub.restore()
})

let asciidocTemplateCn = `= 1. 更友好的 CLI

日期: 2017-11-23

== 状态

列表：提议/通过/完成/已弃用/已取代

2017-11-23 提议
`

test('ADR: init in chinese with Asciidoc', t => {
  let ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./')
  let fsWriteSpy = sinon.stub(fs, 'writeFileSync')
  let consoleSpy = sinon.stub(console, 'log')
  let renameSpy = sinon.stub(fs, 'renameSync')
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-DAF编写完整的单元测试.adoc',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    },
    {
      relativePath: '0000-tests.adoc',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    }
  ])
  let ADRGetDocExtensionSpy = sinon.stub(Config, 'getDocExtension').returns('adoc')
  let fsReadSpy = sinon.stub(fs, 'readFileSync')
  fsReadSpy
    .onCall(0).returns(asciidocTemplateCn)
    .onCall(2).returns(asciidocTemplateCn)
    .onCall(3).returns('{}')
    .onCall(1).returns(JSON.stringify({
      path: 'some'
    }))

  ADR.update()
  t.deepEqual(fsWriteSpy.callCount, 2)
  t.deepEqual(fsReadSpy.callCount, 2)
  t.deepEqual(renameSpy.callCount, 1)
  t.deepEqual(consoleSpy.calledWith('001-DAF编写完整的单元测试.adoc -> 0001-更友好的-cli.adoc'), true)
  fsWriteSpy.restore()
  fsReadSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
  renameSpy.restore()
  ADRGetSavePathSpy.restore()
  ADRGetDocExtensionSpy.restore()
})

let asciidocTemplateJp = `= 1. Foo は Bar ではなく Baz で管理する

年月日: 2017-11-23

== ステータス

リスト：提案中/承認済/完了/非推奨/更新済

2017-11-23 提案中
`

test('ADR: init in japanese with Asciidoc', t => {
  let getForceNfcStub = sinon.stub(Config, 'getForceNfc').returns(true)
  let ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./')
  let fsWriteSpy = sinon.stub(fs, 'writeFileSync')
  let consoleSpy = sinon.stub(console, 'log')
  let renameSpy = sinon.stub(fs, 'renameSync')
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-foo-は-bar-ではなく-baz-で管理する.adoc',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    },
    {
      relativePath: '0000-tests.adoc',
      basePath: '/Users/fdhuang/learing/adr/docs/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    }
  ])
  let ADRGetDocExtensionSpy = sinon.stub(Config, 'getDocExtension').returns('adoc')
  let fsReadSpy = sinon.stub(fs, 'readFileSync')
  fsReadSpy
    .onCall(0).returns(asciidocTemplateJp)
    .onCall(2).returns(asciidocTemplateJp)
    .onCall(3).returns('{}')
    .onCall(1).returns(JSON.stringify({
      path: 'some'
    }))

  ADR.update()
  t.deepEqual(fsWriteSpy.callCount, 2)
  t.deepEqual(fsReadSpy.callCount, 2)
  t.deepEqual(renameSpy.callCount, 1)
  t.deepEqual(consoleSpy.calledWith('001-foo-は-bar-ではなく-baz-で管理する.adoc -> 0001-foo-は-bar-ではなく-baz-で管理する.adoc'), true)
  fsWriteSpy.restore()
  fsReadSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
  renameSpy.restore()
  ADRGetSavePathSpy.restore()
  getForceNfcStub.restore()
  ADRGetDocExtensionSpy.restore()
})
