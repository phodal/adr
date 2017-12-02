let findInFiles = require('find-in-files')

import Config from './Config'

export function search (keywords) {
  findInFiles.find({'term': keywords, 'flags': 'ig'}, Config.getSavePath(), '.md$')
    .then(results => {
      for (let result in results) {
        console.log(result)
      }
    })

}
