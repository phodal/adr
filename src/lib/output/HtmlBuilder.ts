let fs = require('fs')

import Config from '../Config'
import getAdrFiles from '../helpers/getAdrFiles'
import MdHelper from '../helpers/MdHelper'
import AsciidocHelper from '../helpers/AsciidocHelper'
import BasicOutput from './BasicOutput'

const fileExt = Config.getDocExtension()

class HtmlBuilder extends BasicOutput {

  buildFunc () {
    let files = getAdrFiles()
    let path = this.path
    files.forEach(function (file) {
      let fileName = file.relativePath
      if ((fileName === 'README.md' || fileName.indexOf('.md') === -1)
        && (fileName === 'README.adoc' || fileName.indexOf('.adoc') === -1)
        && (fileName === 'README.asciidoc' || fileName.indexOf('.asciidoc') === -1)) {
        return
      }
      let fileData = fs.readFileSync(path + fileName, 'utf8')
      fs.appendFileSync('output.' + fileExt, fileData + '\n\n')
    })
  }

  buildContent () {
    this.buildFunc()
    let fileData = fs.readFileSync('output.' + fileExt, 'utf-8')
    fs.unlinkSync('output.' + fileExt)

    if (fileExt === 'adoc' || fileExt === 'asciidoc') {
      this.result = AsciidocHelper.asciidocRender(fileData)
    } else {
      this.result = MdHelper.mdRender(fileData)
    }
    return this.result
  }

  output () {
    fs.writeFileSync(this.workDir + '/export.html', this.result, 'utf-8')
  }
}

export default HtmlBuilder
