import { AbstractOutput } from './AbstractOutput'

let savePath

class BasicOutput implements AbstractOutput {
  result: any
  path: any
  workDir: any

  constructor (path: string, workDir: string) {
    this.workDir = workDir
    this.path = path
    savePath = this.path
  }

  buildContent () {
    return this.result
  }

  output () {
    return
  }
}

export default BasicOutput
