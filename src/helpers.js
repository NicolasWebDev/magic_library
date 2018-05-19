import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'
import util from 'util'
import fs from 'fs'
const readFile = util.promisify(fs.readFile)

const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'

export default class Helpers {
  static async remoteDocument (url) {
    return JSDOM.fragment(await this.downloadHtml(url))
  }

  static async localDocument (filePath) {
    return JSDOM.fragment(await readFile(filePath))
  }

  static async downloadHtml (givenUrl) {
    return (await fetch(givenUrl, {
      headers: { 'User-Agent': USER_AGENT }
    })).text()
  }
}
