import { GenerateBuilder } from './GenerateBuilder'

export default class SearchListGenerateBuilder extends GenerateBuilder {
  setFiles (files) {
    this.files = files
    return this
  }
}
