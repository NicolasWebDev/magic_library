import AmazonBook from '../src/AmazonBook'
import helpers from '../src/helpers'

describe('AmazonBook', () => {
  let book, ebook

  beforeEach(async () => {
    ebook = await AmazonBook.buildFromFile('./spec/ebook.html')
    book = await AmazonBook.buildFromFile('./spec/book.html')
  })

  describe('title', () => {
    it('returns the title', async () => {
      expect(ebook.title()).toEqual('Coaching Agile Teams: A Companion for ' +
        'ScrumMasters, Agile Coaches, and Project Managers in Transition ' +
        '(Addison-Wesley Signature Series (Cohn))')
      expect(book.title()).toEqual('Kanban and Scrum - Making the Most of' +
        ' Both (Enterprise Software Development)')
    })
  })

  describe('reviewsCount', () => {
    it('returns the number of reviews', () => {
      expect(ebook.reviewsCount()).toBe('6')
      expect(book.reviewsCount()).toEqual('19')
    })
  })

  describe('reviewsRating', () => {
    it('returns the average rating of the reviews', () => {
      expect(ebook.reviewsRating()).toBe('4.0')
      expect(book.reviewsRating()).toBe('4.7')
    })
  })

  describe('authors', () => {
    it('returns the authors as a formatted string', () => {
      expect(ebook.authors()).toBe('Lyssa Adkins')
      expect(book.authors()).toBe('Henrik Kniberg, Mattias Skarin')
    })
  })

  describe('toString', () => {
    it('returns the line I use in my file', () => {
      expect(ebook.toString()).toBe('Coaching Agile Teams: A Companion for' +
        ' ScrumMasters, Agile Coaches, and Project Managers in Transition' +
        ' (Addison-Wesley Signature Series (Cohn)), by Lyssa Adkins *4.0/6')
      expect(book.toString()).toBe('Kanban and Scrum - Making the Most of' +
        ' Both (Enterprise Software Development), by Henrik Kniberg,' +
        ' Mattias Skarin *4.7/19')
    })
  })

  describe('buildFormUrl', () => {
    it('calls helpers.remoteDocument', async () => {
      const spy = jest.spyOn(helpers, 'remoteDocument')
        .mockImplementation(() => {})
      await AmazonBook.buildFromUrl('dummy')
      expect(spy).toHaveBeenCalledWith('dummy')
    })
  })

  describe('buildFromFile', () => {
    it('calls helpers.remoteDocument', async () => {
      const spy = jest.spyOn(helpers, 'localDocument')
        .mockImplementation(() => {})
      await AmazonBook.buildFromFile('dummy')
      expect(spy).toHaveBeenCalledWith('dummy')
    })
  })
})
