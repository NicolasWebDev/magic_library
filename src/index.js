import 'babel-polyfill'
import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'

const downloadHtml = async (givenUrl) => {
  return (await fetch(givenUrl)).text()
}

const remoteDocument = async (url) => {
  return JSDOM.fragment(await downloadHtml(url))
}

(async () => {
  const bookUrl = process.argv[2]
  const document = await remoteDocument(bookUrl)
  const bookTitle = document.querySelector('#ebooksProductTitle')
    .textContent
  const reviewsRating = document
    .querySelector('#acrPopover')
    .getAttribute('title')
    .replace(/(\d\.\d) out of 5 stars/, '$1').valueOf()
  const reviewsCount = document
    .querySelector('#acrCustomerReviewText')
    .textContent
    .replace(/(\d) customer reviews/, '$1').valueOf()
  console.log([bookTitle, reviewsRating, reviewsCount])
})()
