import { htmlRender } from './htmlRender'

const { Remarkable } = require('remarkable')

function slugify (content: string, number: number) {
  let slug = content
    .toLowerCase()
    .split(' ').join('-')
    .split(/\t/).join('--')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/[|$&`~=\\/@+*!?({[\]})<>=.,;:'"^]/g, '')
    .replace(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  return number > 0 ? `${slug}-${number}` : slug
}

function generateToc (fileData: string) {
  let headings: Array<{ content: string, level: number, slug: string }> = []
  let seen = {}
  let headingPattern = /^(#{1,6})\s+(.+?)\s*#*\s*$/gm
  let match

  while ((match = headingPattern.exec(fileData))) {
    let content = match[2]
    let number = seen[content] || 0
    seen[content] = number + 1
    headings.push({ content, level: match[1].length, slug: slugify(content, number) })
  }

  let highestLevel = headings.length ? Math.min(...headings.map(heading => heading.level)) : 0
  return headings.map(heading => {
    let indent = '  '.repeat(heading.level - highestLevel)
    let bullet = [ '-', '*', '+' ][(heading.level - highestLevel) % 3]
    return `${indent}${bullet} [${heading.content}](#${encodeURI(heading.slug)})`
  }).join('\n')
}

export function mdRender (fileData) {
  let lastH1Index = 0
  let md = new Remarkable()
    .use(remarkable => {
      remarkable.renderer.rules.heading_open = function (tokens, idx) {
        let content = tokens[idx + 1].content
        if (tokens[idx].hLevel === 1) {
          lastH1Index = content.split('. ')[0] - 1
          return '<h' + tokens[idx].hLevel + ' id=' + slugify(content, 0) + '>'
        } else {
          return '<h' + tokens[idx].hLevel + ' id=' + slugify(content + ' ' + lastH1Index, 0) + '>'
        }
      }
    })

  let mdToc = generateToc(fileData)
  let tocHtml = md.render(mdToc)
  let contentHtml = md.render(fileData)
  return htmlRender(tocHtml, contentHtml)
}

let MdHelper = {
  mdRender: mdRender
}

export default MdHelper
