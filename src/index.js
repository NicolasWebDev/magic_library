import 'babel-polyfill'
import AmazonBook from './AmazonBook'

const main = async () => {
  const bookUrl = process.argv[2]
  const book = await AmazonBook.buildFromUrl(bookUrl)
  console.log(book.toString())
}

main()
  .then(() => {}, error => { console.log(error) })
  .then(() => process.exit())
