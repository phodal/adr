import { htmlRender } from './htmlRender'

let asciidoctor = require('@asciidoctor/core')()

export function AsciidocRender (fileData) {
  let regExp1 = new RegExp('^=(.*)', 'gm')
  fileData = fileData.replace(regExp1, '==$1')
  let contentHtml = asciidoctor.convert(fileData, { 'safe': 'safe', 'standalone': true, 'attributes': [ 'toc' ]})
  
  return htmlRender("", contentHtml)
}

let AsciidocHelper = {
    asciidocRender: AsciidocRender
}

export default AsciidocHelper
