let fs = require('fs')
let workDir = process.cwd()

export function getSavePath () {
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
