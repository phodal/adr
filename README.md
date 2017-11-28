ADR - Architecture Decision Records（轻量级架构决策记录工具）
===

> ADR - Architecture Decision Records（轻量级架构决策记录工具）

[![Build Status](https://travis-ci.org/phodal/adr.svg?branch=master)](https://travis-ci.org/phodal/adr) [![codecov.io](https://codecov.io/github/phodal/adr/coverage.svg?branch=master)](https://codecov.io/github/phodal/adr?branch=master)  [![Maintainability](https://api.codeclimate.com/v1/badges/5cd05f9857e0a2031ba1/maintainability)](https://codeclimate.com/github/phodal/adr/maintainability) 

[![Markdown Improve](https://img.shields.io/badge/markdown--improve-Phodal-blue.svg)](https://github.com/phodal/markdown-improve) [![node](https://img.shields.io/node/v/adr.svg)](https://www.npmjs.com/package/adr) [![npm](https://img.shields.io/npm/v/adr.svg)]()

Inspired by [https://github.com/npryce/adr-tools](https://github.com/npryce/adr-tools), but supported Windows.

ADR Blogpost: [Documenting Architecture Decisions](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions)

**Features**

 - Support on Node.js OS: Windows, Linux, Mac OS (Done)
 - i18n: English, 中文 (Done)
 - status logs (Done)
 - status query (doing)
 - better list view (Done)

Install
---

1. install

```
npm install -g adr
```

2. init

```
adr init <language>
```

e.x: ``adr init 'en'``

### new

```
adr new <decision>
```

e.x: ``adr new "创建项目"``

### list

```
adr list
```

result:

```
╔══════════════════════════════════════╤══════════════╤═══════════════════╗
║ Decision                             │ Last Modified│ Last Status       ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 1.编写完整的单元测试                    │ 2017-11-26   │ 2017-11-26 已完成  ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 2.添加目录生成                         │ 2017-11-26   │ 2017-11-25 已完成  ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 3.图形生成功能                         │ 2017-11-26   │ 2017-11-24 已完成  ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 4.生成在线图形                         │ 2017-11-26   │ 2017-11-22 提议    ║
╚══════════════════════════════════════╧══════════════╧═══════════════════╝
```

### generate toc

```
adr generate toc
```

results:

```
# Architecture Decision Records

* [1. 编写完整的单元测试](001-编写完整的单元测试.md)
* [2. 添加目录生成](002-添加目录生成.md)
* [3. 图形生成](003-图形生成.md)
```

### generate graph

```
adr generate graph
```

results:

```
digraph {
  node [shape=plaintext];
  _1 [label="1.编写完整的单元测试"; URL="001-编写完整的单元测试.md"]
  _2 [label="2.添加目录生成"; URL="002-添加目录生成.md"]
  _1 -> _2 [style="dotted"];
  _3 [label="3.图形生成"; URL="003-图形生成.md"]
  _2 -> _3 [style="dotted"];
}
```

### update filename by title

```
adr update
```

### decisions change logs

```
adr logs <index>
```

e.x. ``adr logs 9``

```
╔════════════╤══════╗
║  -         │  -   ║
╟────────────┼──────╢
║ 2017-11-23 │ 提议 ║
╟────────────┼──────╢
║ 2017-11-24 │ 通过 ║
╚════════════╧══════╝
```

### export adr

support: json, csv, html, markdown

```
adr export <type>
```

e.x. ``adr export csv``

```
Index, 决策, 上次修改时间, 最后状态
1, 编写完整的单元测试, 2017-11-26, 2017-11-26 已完成
2, 添加目录生成, 2017-11-26, 2017-11-25 已完成
3, 图形生成功能, 2017-11-26, 2017-11-24 已完成
```

Config
---

current: **language**, **path**

example config: 

```
{
  "path":"doc/adr/",
  "language":"zh-cn"
}
```

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

@ 2017 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the MIT license. See `LICENSE` in this directory.
