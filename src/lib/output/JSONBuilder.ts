import { JsonGenerateBuilder } from '../base/JsonGenerateBuilder'

let fs = require('fs')
let moment = require('moment')

import BasicOutput from './BasicOutput'
import StatusHelper from '../StatusHelper'
import Config from '../Config'

let savePath = Config.getSavePath()

class JSONBuilder extends BasicOutput {
  buildFunc (index, decision, file, bodyString): string[] {
    let lastStatus = StatusHelper.getLatestStatus(savePath + file.relativePath)
    let body = {
      index: index,
      decision: decision,
      modifiedDate: moment(file.mtime).format('YYYY-MM-DD'),
      lastStatus: lastStatus
    }
    return bodyString.push(body)
  }

  buildContent () {
    let path = Config.getSavePath()
    let graphGenerate = new JsonGenerateBuilder(path)
    this.result = graphGenerate
      .setBody(this.buildFunc)
      .build()

    return JSON.stringify(this.result)
  }

  output () {
    fs.writeFileSync(this.workDir + '/export.json', JSON.stringify(this.result), 'utf-8')
  }
}

export default JSONBuilder
