const fs = require('fs')
const formidable = require('formidable')
const path = require('path')
const sharp = require('sharp')
export default class OtherServices {
  static async uploadImage (req, res) {
    try {
      const generateID = () => {
        let text = ''
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < 16; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
      }

      const newID = generateID()
      // to declare some path to store your converted image
      const path = './images/' + newID + '.png'
      const imgdata = req.body.base64
      // to convert base64 format into random filename
      const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '')
      fs.writeFileSync(path, base64Data, { encoding: 'base64' })
      res.json(newID + '.png')
    } catch (e) {
      res.json(null)
    }
  }

  static async uploadFile (req, res) {
    try {
      const form = new formidable.IncomingForm()
      form.uploadDir = './uploads/'
      form.parse(req, (err, fields, files) => {
        if (err) throw err
        const tmpPath = files.file.path
        const fileName = files.file.name

        const newPath = form.uploadDir + fileName
        fs.rename(tmpPath, newPath, (err) => {
          if (err) throw err
          res.json(fileName)
        })
      })
      return
    } catch (e) {
      res.json(null)
    }
  }

  static async getFile (req, res) {
    const linkFile = path.join(__dirname, `../uploads/${req.params.linkFile}`)
    res.download(linkFile)
  }

  static async getImage (req, res) {
    const linkFile = `./images/${req.params.linkImage}`
    fs.readFile(linkFile, function (err, data) {
      if (!err) {
        res.writeHead(200, { 'Content-Type': 'image/png' })
        res.end(data) // Send the file data to the browser.
      } else {
        fs.readFile(`${__dirname}/default.png`, function (err, data) {
          if (!err) {
            res.writeHead(200, { 'Content-Type': 'image/png' })
            res.end(data) // Send the file data to the browser.
          } else {
            res.json('')
          }
        })
      }
    })
  }

  static async downloadImage (req, res) {
    const linkFile = path.join(__dirname, `../images/${req.params.linkImage}`)
    res.download(linkFile)
  }

  static async upLoadAndScale (req, res) {
    try {
      const generateID = () => {
        let text = ''
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < 16; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
      }

      const newID = generateID()
      // to declare some path to store your converted image
      const path = './images/'
      const imgdata = req.body.base64
      // to convert base64 format into random filename
      const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '')
      const image = Buffer.from(base64Data, 'base64')
      sharp(image)
        .resize(128)
        .toFile(path + 'small_' + newID + '.png')
      sharp(image)
        .resize(512)
        .toFile(path + 'large_' + newID + '.png')
      sharp(image)
        .toFile(path + 'default_' + newID + '.png')

      res.json(newID + '.png')
    } catch (e) {
      console.log('upLoadAndScale -> e', e)
      res.json(null)
    }
  }

  static async getImageScale (req, res) {
    const { name, size } = req.query
    const linkFile = `./images/${size}_${name}`
    fs.readFile(linkFile, function (err, data) {
      if (!err) {
        res.writeHead(200, { 'Content-Type': 'image/png' })
        res.end(data) // Send the file data to the browser.
      } else {
        fs.readFile(`${__dirname}/default.png`, function (err, data) {
          if (!err) {
            res.writeHead(200, { 'Content-Type': 'image/png' })
            res.end(data) // Send the file data to the browser.
          } else {
            res.json('')
          }
        })
      }
    })
  }
}
