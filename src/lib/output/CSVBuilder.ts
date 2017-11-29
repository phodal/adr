let fs = require('fs')
let moment = require('moment')

import { AbstractOutput } from './AbstractOutput'
import Status from '../status'
import Utils from '../utils'
import Config from '../Config'
import { GenerateBuilder } from '../base/GenerateBuilder'

let savePath

class CSVBuilder implements AbstractOutput {
  result: any
  path: any
  workDir: any

  constructor (path: string, workDir: string) {
    this.workDir = workDir
    this.path = path
    savePath = this.path
  }

  buildFunc (index, decision, file, bodyString): string[] {
    let lastStatus = Status.getLatestStatus(savePath + file.relativePath)
    let body = `${index}, ${decision}, ${moment(file.mtime).format('YYYY-MM-DD')}, ${lastStatus}\n`
    return bodyString.push(body)

  }
  buildContent () {
    let path = Config.getSavePath()
    let i18n = Utils.getI18n()
    let graphGenerate = new GenerateBuilder(path)
    let startString = `Index, ${i18n.decision}, ${i18n.modifiedDate}, ${i18n.lastStatus}\n`
    this.result = graphGenerate
      .setStart(startString)
      .setEnd('')
      .setBody(this.buildFunc)
      .build()

    return this.result
  }

  output () {
    fs.writeFileSync(this.workDir + '/export.csv', this.result)
  }
}

export default CSVBuilder
