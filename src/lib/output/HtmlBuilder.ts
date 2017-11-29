let walkSync = require('walk-sync')
let fs = require('fs')

import MdHelper from '../helpers/MdHelper'
import { AbstractOutput } from '../base/AbstractOutput'

let savePath

class HtmlBuilder implements AbstractOutput {
  result: any
  path: any
  workDir: any

  constructor (path: string, workDir: string) {
    this.workDir = workDir
    this.path = path
    savePath = this.path
  }

  buildFunc () {
    let files = walkSync.entries(this.path, {globs: ['**/*.md']})
    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      let fileName = file.relativePath
      if (fileName === 'README.md' || fileName.indexOf('.md') === -1) {
        break
      }
      let fileData = fs.readFileSync(this.path + fileName, 'utf8')
      let firstLine = fileData.split('\n')[0]
      let indexRegex = /#\s(\d+)\.\s/.exec(firstLine)
      if (!indexRegex || indexRegex.length < 1) {
        break
      }

      fs.appendFileSync('output.md', fileData + '\n\n')
    }
  }

  buildContent () {
    this.buildFunc()
    let fileData = fs.readFileSync('output.md', 'utf-8')
    fs.unlinkSync('output.md')

    this.result = MdHelper.mdRender(fileData)
    return this.result
  }

  output () {
    fs.writeFileSync(this.workDir + '/export.html', this.result, 'utf-8')
  }
}

export default HtmlBuilder
