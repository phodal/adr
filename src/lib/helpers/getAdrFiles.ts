import * as walkSync from 'walk-sync'
import * as fs from 'fs'
import Config from '../Config'

export default function getAdrFiles () {
  let savePath = Config.getSavePath()
  return walkSync.entries(savePath, {
    globs: ['**/*.md', '**/*.asciidoc', '**/*.adoc'],
    ignore: ['README.md', 'template.md', 'README.adoc', 'template.adoc', 'README.asciidoc', 'template.asciidoc'],
    fs
  })
}
