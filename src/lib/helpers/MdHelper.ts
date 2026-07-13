import { htmlRender } from './htmlRender'

const { Remarkable } = require('remarkable')

function slugify (content: string, number: number) {
  let slug = ''
  let punctuation = '|$&`~=\\/@+*!?({[]})<>=.,;:\'"^。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」'

  for (let character of content.toLowerCase().normalize('NFD')) {
    let code = character.charCodeAt(0)
    if (code >= 0x0300 && code <= 0x036f) continue
    if (character === ' ') slug += '-'
    else if (character === '\t') slug += '--'
    else if (!punctuation.includes(character)) slug += character
  }

  slug = slug || 'heading'
  return number > 0 ? `${slug}-${number}` : slug
}

function generateToc (fileData: string) {
  let headings: Array<{ content: string, level: number, slug: string }> = []
  let seen: { [key: string]: number } = {}
  let tokens = new Remarkable().parse(fileData, {})

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'heading_open') continue
    let content = tokens[i + 1].content
    let number = seen[content] || 0
    seen[content] = number + 1
    headings.push({ content, level: tokens[i].hLevel, slug: slugify(content, number) })
  }

  let highestLevel = headings.length ? Math.min(...headings.map(heading => heading.level)) : 0
  return headings.map(heading => {
    let indent = '  '.repeat(heading.level - highestLevel)
    let bullet = [ '-', '*', '+' ][(heading.level - highestLevel) % 3]
    return `${indent}${bullet} [${heading.content}](#${encodeURIComponent(heading.slug)})`
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
          return '<h' + tokens[idx].hLevel + ' id="' + encodeURIComponent(slugify(content, 0)) + '">'
        } else {
          return '<h' + tokens[idx].hLevel + ' id="' + encodeURIComponent(slugify(content + ' ' + lastH1Index, 0)) + '">'
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
