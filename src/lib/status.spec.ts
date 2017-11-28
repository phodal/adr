let sinon = require('sinon')
let fs = require('fs')
let walkSync = require('walk-sync')

import { test } from 'ava'

import ADR from 'adr'
let Status = ADR.Status

let adrOptions = JSON.stringify({
  path: './',
  language: 'zh-cn'
})

let mdTemplate = `
# 10. 更友好的 CLI

日期: 2017-11-23

## 状态

列表：提议/通过/完成/已弃用/已取代

2017-11-23 提议

2017-11-23 通过

`

test('ADR: list status', t => {
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-编写完整的单元测试.md',
      basePath: '/Users/fdhuang/learing/adr/doc/adr/',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    }
  ])

  let fsReadSpy = sinon.stub(fs, 'readFileSync')
    .onCall(0).returns(mdTemplate)
    .onCall(1).returns(JSON.stringify(adrOptions))
    .onCall(2).returns(mdTemplate)

  let status = Status.getAllStatus('./001-README.md')
  t.deepEqual(status, [
    '2017-11-23 提议',
    '2017-11-23 通过'
  ])
  fsReadSpy.restore()
  entriesSpy.restore()
})

test('placeholder', t => {
  t.deepEqual(true, true)
})
