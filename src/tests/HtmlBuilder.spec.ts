import test from 'ava'

let sinon = require('sinon')
let walkSync = require('walk-sync')
let fs = require('fs')
import ADR from 'adr'

let MdHelper = ADR.MdHelper
let Utils = ADR.Utils
let Config = ADR.Config

let adrTemplate = `# 1. 编写完整的单元测试

日期: 2017/11/22

## 状态

2017-11-22 提议
2017-11-26 已完成
`

test('ADR: export html', t => {
  let renderHtml = `<html>`

  let ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./')
  let dirSpy = sinon.stub(Utils, 'getWorkDir').returns('.')
  let mdHelperSpy = sinon.stub(MdHelper, 'mdRender').returns(renderHtml)
  // let consoleSpy = sinon.stub(console, 'log')
  let fsReadSpy = sinon.stub(fs, 'readFileSync')
    .onCall(0).returns(adrTemplate)
    .onCall(1).returns(adrTemplate)
    .onCall(2).returns('')
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

  let htmlBuilder = new ADR.HtmlBuilder('', '')
  let output = htmlBuilder.buildContent()
  t.deepEqual(renderHtml, output)
  ADRGetSavePathSpy.restore()
  fsReadSpy.restore()
  entriesSpy.restore()
  mdHelperSpy.restore()
  dirSpy.restore()
  // consoleSpy.restore()
})
