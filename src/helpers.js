import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'
import util from 'util'
import fs from 'fs'
const readFile = util.promisify(fs.readFile)

export default class Helpers {
  static async remoteDocument (url) {
    return JSDOM.fragment(await this.downloadHtml(url))
  }

  static async localDocument (filePath) {
    return JSDOM.fragment(await readFile(filePath))
  }

  static async downloadHtml (givenUrl) {
    return (await fetch(givenUrl)).text()
  }
}
