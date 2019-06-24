let sinon = require('sinon')
let fs = require('fs')
let walkSync = require('walk-sync')
let LRU = require('lru-cache')

import test from 'ava'
import ADR from 'adr'

let mdTemplate = `# 1. 更友好的 CLI

日期: 2017-11-23

## 状态

列表：提议/通过/完成/已弃用/已取代

2017-11-23 提议

2017-11-24 讨论

2017-11-25 通过
`

test('ADR: logs', t => {
  let consoleSpy = sinon.stub(console, 'log')
  let renameSpy = sinon.stub(fs, 'renameSync')
  let cacheSpy = sinon.stub(LRU.prototype, 'get').returns({
    path: 'some',
    language: 'zh-cn'
  })

  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-DAF编写完整的单元测试.md',
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
  let fsReadSpy = sinon.stub(fs, 'readFileSync')
  fsReadSpy
    .onCall(0).returns(mdTemplate)
    .onCall(1).returns(mdTemplate)

  let logs = ADR.logs('1')
  t.deepEqual(logs, `╔════════════╤══════╗
║  -         │  -   ║
╟────────────┼──────╢
║ 2017-11-23 │ 提议 ║
╟────────────┼──────╢
║ 2017-11-24 │ 讨论 ║
╟────────────┼──────╢
║ 2017-11-25 │ 通过 ║
╚════════════╧══════╝
`)
  fsReadSpy.restore()
  entriesSpy.restore()
  consoleSpy.restore()
  renameSpy.restore()
  cacheSpy.restore()
})
