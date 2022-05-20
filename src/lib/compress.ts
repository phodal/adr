let fs = require('fs')
let sharp = require('sharp')
let resolve = require('path').resolve

import cache from './cache'
import Config from './Config'

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
    // TODO notify the user that no assets were found
    return
  }

  let listOfCompressedImages = getListOfCompressedImages()
  let listOfImages = getListOfImages()

  listOfImages.forEach((image, index, arr) => {
    let filename = removeFileFormat(image)

    if (!listOfCompressedImages.includes(filename)) {
      sharp(resolve(assetsPath, image))
        .jpeg({ quality: 50 })
        .resize(1000, 1000, { withoutEnlargement: true, fit: 'inside' })
        .toBuffer(function (err, buffer) {
          if (err) {
            console.log(err) // TODO handle error
          }

          const newFileName = changeFileFormat(image, 'jpg')

          fs.writeFileSync(resolve(assetsPath, newFileName), buffer)
          fs.rmSync(resolve(assetsPath, image))
          listOfCompressedImages.push(newFileName)

          if (index === arr.length - 1) {
            saveListOfCompressedImages(listOfCompressedImages)
          }
        })
    }
  })
}
