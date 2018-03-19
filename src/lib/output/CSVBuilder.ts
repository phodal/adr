let fs = require('fs')
let moment = require('moment')

import StatusHelper from '../StatusHelper'
import Utils from '../utils'
import Config from '../Config'
import BasicOutput from './BasicOutput'
import { GenerateBuilder } from '../base/GenerateBuilder'

let savePath = Config.getSavePath()

class CSVBuilder extends BasicOutput {
  buildFunc (index, decision, file, bodyString): string[] {
    let lastStatus = StatusHelper.getLatestStatus(savePath + file.relativePath)
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
