import 'babel-polyfill'
import AmazonBook from './AmazonBook'

(async () => {
  const bookUrl = process.argv[2]
  const book = await AmazonBook.buildFromUrl(bookUrl)
  console.log(book.toString())
})()
