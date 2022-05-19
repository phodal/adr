let fs = require('fs')
let sharp = require('sharp')

import Config from './Config'
import cache from './cache'

function getListOfCompressedImages () {
  return cache.get('images')
}
function getListOfImages () {
  let assetsPath = Config.getAssetsPath()
  return fs.readdirSync(assetsPath)
}
function saveListOfCompressedImages (imageList: string[]) {
  cache.update('images', imageList)
}
function removeFileFormat (fileName: string) {
  return fileName.split('.').slice(0, -1).join('.')
}
function changeFileFormat (fileName: string, targetFormat: string) {
  return removeFileFormat(fileName) + '.' + targetFormat
}

export function compress () {
  let assetsPath = Config.getAssetsPath()

  if (!fs.existsSync(assetsPath)) {
    return
  }

  let listOfCompressedImages = getListOfCompressedImages()
  let listOfImages = getListOfImages()

  listOfImages.forEach((image, index, arr) => {
    let filename = removeFileFormat(image)

    if (!listOfCompressedImages.includes(filename)) {
      sharp(assetsPath + image)
        .jpeg({ quality: 50 })
        .resize(1000, 1000, { withoutEnlargement: true, fit: 'inside' })
        .toBuffer(function (err, buffer) {
          if (err) {
            console.log('oops') // TODO handle error
          }

          const newFileName = changeFileFormat(image, 'jpg')

          fs.writeFileSync(assetsPath + newFileName, buffer, () => {
            fs.rmdirSync(assetsPath + image)
            listOfCompressedImages.push(newFileName)

            if (index === arr.length - 1) {
              saveListOfCompressedImages(listOfCompressedImages)
              console.log('Done.')
            }
          })
        })
    }
  })
}
