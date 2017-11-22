let fs = require('fs')
let path = require('path')

export function create (name: string) {
  let raw = fs.readFileSync(__dirname + path.normalize('/template.md'), 'utf8')
  let dateObj = new Date()
  let month = dateObj.getUTCMonth() + 1
  let day = dateObj.getUTCDate()
  let year = dateObj.getUTCFullYear()
  let newdate = year + '/' + month + '/' + day

  let result = raw.replace(/{NUMBER}/g, '1')
    .replace(/{TITLE}/g, name)
    .replace(/{DATE}/g, newdate)
    .replace(/{STATUS}/g, '状态')

  fs.writeFileSync('001-hello' + '.md', result)
}
