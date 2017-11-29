let fs = require('fs')

export function htmlRender (tocHtml: string, contentHtml: string) {
  let template = fs.readFileSync(__dirname + '/export_template.html', 'utf-8')
  return template.replace('${tocHtml}', tocHtml)
    .replace('${contentHtml}', contentHtml)
}
