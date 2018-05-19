import helpers from './helpers'

const AUTHORS_FALSE_POSITIVES = ['search results', 'Learn about Author Central']

export default class AmazonBook {
  constructor (document) {
    this.constructor.validateDocumentIsNotCaptcha(document)
    this.document = document
  }

  static validateDocumentIsNotCaptcha (document) {
    if (document.querySelector('form[action="/errors/validateCaptcha"]')) {
      throw new Error('CaptchaError')
    }
  }

  static async buildFromUrl (url) {
    return new AmazonBook(await helpers.remoteDocument(url))
  }

  static async buildFromFile (filePath) {
    return new AmazonBook(await helpers.localDocument(filePath))
  }

  // Returns the first selector that has been found.
  queryFirstSelector (...selectors) {
    let result
    for (let selector of selectors) {
      result = this.document.querySelector(selector)
      if (result) return result
    }
  }

  // Returns the first attribute of the element that exists.
  getFirstAttribute (element, ...attributes) {
    for (let attribute of attributes) {
      if (element.hasAttribute(attribute)) {
        return element.getAttribute(attribute)
      }
    }
  }

  reviewsRating () {
    const element = this.queryFirstSelector('#acrPopover',
      '#cmrsSummary-popover-data-holder')
    return this.getFirstAttribute(element, 'title', 'data-title')
      .replace(/(\d\.\d) out of 5 stars/, '$1')
  }

  reviewsCount () {
    return this.queryFirstSelector('#acrCustomerReviewText', '#cmrs-atf')
      .textContent
      .replace(/(\d) customer reviews?/, '$1')
  }

  title () {
    return this.queryFirstSelector('#ebooksProductTitle', '#productTitle')
      .textContent
  }

  authors () {
    return Array.from(
      this.document.querySelectorAll('.author a.a-link-normal')
    )
      .filter(
        elt => !AUTHORS_FALSE_POSITIVES.includes(elt.textContent) &&
        (elt.hasAttribute('data-asin') || elt.href.match(/author/))
      )
      .map(elt => elt.textContent).join(', ')
  }

  toString () {
    return `${this.title()}, by ${this.authors()}` +
      ` *${this.reviewsRating()}/${this.reviewsCount()}`
  }
}
