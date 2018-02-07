import 'babel-polyfill'
import helpers from './helpers'

class AmazonBook {
  static async build (url) {
    const instance = new AmazonBook(url)
    instance.document = await helpers.remoteDocument(url)
    return instance
  }

  constructor (url) {
    this.url = url
  }

  reviewsRating () {
    return this.document
      .querySelector('#acrPopover')
      .getAttribute('title')
      .replace(/(\d\.\d) out of 5 stars/, '$1').valueOf()
  }

  reviewsCount () {
    return this.document
      .querySelector('#acrCustomerReviewText')
      .textContent
      .replace(/(\d) customer reviews/, '$1').valueOf()
  }

  title () {
    return this.document.querySelector('#ebooksProductTitle').textContent
  }

  authors () {
    return Array.from(this.document.querySelectorAll('.contributorNameID'))
      .map(elt => elt.textContent)
      .join(', ')
  }

  toString () {
    return `${this.title()}, by ${this.authors()} *${this.reviewsRating()}/${this.reviewsCount()}`
  }
}

(async () => {
  const bookUrl = process.argv[2]
  const book = await AmazonBook.build(bookUrl)
  console.log(book.toString())
})()
