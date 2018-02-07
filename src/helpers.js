import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'

export default class Helpers {
  static async remoteDocument (url) {
    return JSDOM.fragment(await this.downloadHtml(url))
  }

  static async downloadHtml (givenUrl) {
    return (await fetch(givenUrl)).text()
  }
}
