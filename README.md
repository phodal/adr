ARD Tools in Node.js
===

[![Build Status](https://travis-ci.org/phodal/adr.svg?branch=master)](https://travis-ci.org/phodal/adr)

Inspired by [https://github.com/npryce/adr-tools](https://github.com/npryce/adr-tools)

> Markdown Improve Tools Series

Install
---

1. install

```
npm install -g adr
```

2. new

```
adr new "创建项目"
```

3. list

```
adr list
```

result:

```
╔══════════════════════╤══════════════╗
║ 决策                 │ 上次修改时间 ║
╟──────────────────────┼──────────────╢
║ 1.编写完整的单元测试 │ 2017-11-22   ║
╟──────────────────────┼──────────────╢
║ 2.添加目录生成       │ 2017-11-22   ║
╟──────────────────────┼──────────────╢
║ 3.图形生成           │ 2017-11-22   ║
╚══════════════════════╧══════════════╝
```

4. generate toc

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

5. generate graph

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

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

? 2017 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the MIT license. See `LICENSE` in this directory.
