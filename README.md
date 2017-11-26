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
║ 决策                                 │ 上次修改时间 │ 最后状态          ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 1.编写完整的单元测试                 │ 2017-11-26   │ 2017-11-26 已完成 ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 2.添加目录生成                       │ 2017-11-26   │ 2017-11-25 已完成 ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 3.图形生成功能                       │ 2017-11-26   │ 2017-11-24 已完成 ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 4.生成在线图形                       │ 2017-11-26   │ 2017-11-22 提议   ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 5.保持功能与-adr-tools-基本一致      │ 2017-11-26   │ 2017-11-26 已弃用 ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 6.添加-update-功能来通过内容更新文件 │ 2017-11-26   │ 2017-11-24 已完成 ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 7.在-list-展示-adr-的状态            │ 2017-11-25   │ 2017/11/24 完成   ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 8.使用-logs-查看指定-index-状态记录  │ 2017-11-25   │ 2017-11-23 提议   ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 9.提供多语言支持                     │ 2017-11-25   │ 2017-11-23 通过   ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 10.更友好的-cli                      │ 2017-11-25   │ 2017-11-23 提议   ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 11.添加-3-位数到-4-位数升级的支持    │ 2017-11-25   │ 2017-11-24 提议   ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 12.重构重复代码到-typescript-风格    │ 2017-11-25   │ 2017-11-25 提议   ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 13.考虑添加-link-cli-来映射对应关系  │ 2017-11-26   │ 2017-11-26 提议   ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 14.考虑添加-tag-cli-来使用标签查询   │ 2017-11-26   │ 2017-11-26 提议   ║
╟──────────────────────────────────────┼──────────────┼───────────────────╢
║ 15.考虑添加-export-功能来导出-adr    │ 2017-11-26   │ 2017-11-26 提议   ║
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

Config
---

Current: **Language**, *workdir**

example config: 

```
{
  "path":"doc/ard/",
  "language":"zh-cn"
}
```

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

@ 2017 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the MIT license. See `LICENSE` in this directory.
