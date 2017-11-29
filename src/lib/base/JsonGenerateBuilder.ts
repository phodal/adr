import { GenerateBuilder } from './GenerateBuilder'

export class JsonGenerateBuilder extends GenerateBuilder {
  build () {
    let results: string[][] = []
    for (let i = 0; i < this.bodyString.length; i++) {
      let currentBodyString = this.bodyString[i]
      if (currentBodyString) {
        results.push(currentBodyString)
      }
    }
    return results
  }
}
