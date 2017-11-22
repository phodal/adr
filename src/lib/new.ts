let fs = require('fs')
let path = require('path')
let workDir = process.cwd()
let mkdirp = require('mkdirp')

let createDecisions = function (name: string, savePath: string | any | void) {
  let raw = fs.readFileSync(__dirname + path.normalize('/template.md'), 'utf8')
  let dateObj = new Date()
  let month = dateObj.getUTCMonth() + 1
  let day = dateObj.getUTCDate()
  let year = dateObj.getUTCFullYear()
  let newDate = year + '/' + month + '/' + day

  let result = raw.replace(/{NUMBER}/g, '1')
    .replace(/{TITLE}/g, name)
    .replace(/{DATE}/g, newDate)
    .replace(/{STATUS}/g, '状态')

  fs.writeFileSync(savePath + '001-hello' + '.md', result)
};

export function create (name: string) {
  let savePath = getSavePath()
  console.log('保存的路径是：' + savePath)
  mkdirp(savePath, function (err) {
    if (err) console.error(err)
    else createDecisions(name, savePath)
  })
}

function getSavePath () {
  if (!fs.existsSync(workDir + '/.adr.json')) {
    return workDir + '/doc/ard/'
  }

  let config = fs.readFileSync(workDir + '/.adr.json', 'utf8')

  try {
    return JSON.parse(config).path
  } catch (e) {
    return console.error(e)
  }
}
