let sinon = require('sinon')
let walkSync = require('walk-sync')
import test from 'ava'
import ADR from 'adr'

let Config = ADR.Config

test('ADR: generate graph', t => {
  let ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./')
  let consoleSpy = sinon.stub(console, 'log')
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-编写完整的单元测试.md',
      basePath: '/test',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    },
    {
      relativePath: '002-编写完整的单元测试.md',
      basePath: '/test',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    },
    {
      relativePath: 'README.md',
      basePath: '/test',
      mode: 33188,
      size: 246,
      mtime: 1511435254653 }
  ])

  let results = ADR.generate('graph')
  console.log(results)
  t.deepEqual(results,
`digraph {
  node [shape=plaintext];
  _1 [label="1.编写完整的单元测试"; URL="001-编写完整的单元测试.md"]
  _2 [label="2.编写完整的单元测试"; URL="002-编写完整的单元测试.md"]
  _1 -> _2 [style="dotted"];
}
`)

  consoleSpy.restore()
  ADRGetSavePathSpy.restore()
  entriesSpy.restore()
})

test('ADR: generate toc', t => {
  let ADRGetSavePathSpy = sinon.stub(Config, 'getSavePath').returns('./')
  let consoleSpy = sinon.stub(console, 'log')
  let entriesSpy = sinon.stub(walkSync, 'entries').returns([
    {
      relativePath: '001-编写完整的单元测试.md',
      basePath: '/test',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    },
    {
      relativePath: '002-编写完整的单元测试.md',
      basePath: '/test',
      mode: 33188,
      size: 246,
      mtime: 1511435254653
    },
    {
      relativePath: 'README.md',
      basePath: '/test',
      mode: 33188,
      size: 246,
      mtime: 1511435254653 }
  ])

  let results = ADR.generate('toc')
  console.log(results)
  t.deepEqual(results,
`# 架构决策记录

* [1. 编写完整的单元测试](001-编写完整的单元测试.md)
* [2. 编写完整的单元测试](002-编写完整的单元测试.md)`)

  consoleSpy.restore()
  ADRGetSavePathSpy.restore()
  entriesSpy.restore()
})

test('ADR: generate error', t => {
  let consoleSpy = sinon.stub(console, 'log')
  ADR.generate('others')
  t.deepEqual(consoleSpy.called, true)
  consoleSpy.restore()
})
