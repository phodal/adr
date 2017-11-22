let fs = require('fs')
let walkSync = require('walk-sync');
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

function pad(num, size) {
  var s = "000" + num;
  return s.substr(s.length-size);
}

export function getLastNumber () {
  let path = getSavePath()
  let files = walkSync(path)

  if(files && files.length > 0) {
    let lastNumber = parseInt(files[files.length - 1].substring(0, 3))

    for(let i = 0;i < files.length;i++) {
      let file = files[i]
      let number = file.substring(0, 3)
      let int = parseInt(number);
      if(int > lastNumber) {
        lastNumber = int
      }
    }

    return lastNumber
  }
}

export function getNewIndex () {
  let lastIndex = getLastNumber()
  if(!lastIndex) {
    return '001'
  }
  lastIndex = lastIndex + 1
  return pad(lastIndex, 3)
}
