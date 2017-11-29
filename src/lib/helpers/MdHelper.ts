import { htmlRender } from './htmlRender'

let toc = require('markdown-toc')
let Remarkable = require('remarkable')

export function mdRender (fileData) {
  let lastH1Index = 0
  let md = new Remarkable()
    .use(remarkable => {
      remarkable.renderer.rules.heading_open = function (tokens, idx) {
        let content = tokens[idx + 1].content
        if (tokens[idx].hLevel === 1) {
          lastH1Index = content.split('. ')[0] - 1
          return '<h' + tokens[idx].hLevel + ' id=' + toc.slugify(content) + '>'
        } else {
          return '<h' + tokens[idx].hLevel + ' id=' + toc.slugify(content + ' ' + lastH1Index) + '>'
        }
      }
    })

  let mdToc = toc(fileData).content
  let tocHtml = md.render(mdToc)
  let contentHtml = md.render(fileData)
  return htmlRender(tocHtml, contentHtml)
}

let MdHelper = {
  mdRender: mdRender
}

export default MdHelper
