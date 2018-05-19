import AmazonBook from '../src/AmazonBook'
import helpers from '../src/helpers'

const mockOn = (object, methodName, returnValue) => jest
  .spyOn(object, methodName)
  .mockReturnValue(returnValue)

describe('AmazonBook', () => {
  let book, ebook

  beforeEach(async () => {
    ebook = await AmazonBook.buildFromFile('./spec/ebook.html')
    book = await AmazonBook.buildFromFile('./spec/book.html')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('validateDocumentIsNotCaptcha', () => {
    it('throws a CaptchaError if the document is a captcha', async () => {
      const document = await helpers.localDocument('./spec/captcha_page.html')
      expect(() => { AmazonBook.validateDocumentIsNotCaptcha(document) })
        .toThrow('CaptchaError')
    })
  })

  describe('constructor', () => {
    it('calls validateDocumentIsNotCaptcha', () => {
      const mock = mockOn(AmazonBook, 'validateDocumentIsNotCaptcha')
      /* eslint-disable-next-line no-new */
      new AmazonBook('chien')
      expect(mock).toHaveBeenCalledWith('chien')
    })
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
    it('returns the number of reviews', async () => {
      expect(ebook.reviewsCount()).toBe('6')
      expect(book.reviewsCount()).toEqual('19')
      const book2 = await AmazonBook.buildFromFile('./spec/book2.html')
      expect(book2.reviewsCount()).toEqual('1')
    })
  })

  describe('reviewsRating', () => {
    it('returns the average rating of the reviews', () => {
      expect(ebook.reviewsRating()).toBe('4.0')
      expect(book.reviewsRating()).toBe('4.7')
    })
  })

  describe('authors', () => {
    it('returns the authors as a formatted string', async () => {
      expect(ebook.authors()).toBe('Lyssa Adkins')
      expect(book.authors()).toBe('Henrik Kniberg, Mattias Skarin')
      const book3 = await AmazonBook.buildFromFile('./spec/book3.html')
      expect(book3.authors()).toBe('Mitch Lacey')
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
      const mock = mockOn(helpers, 'remoteDocument')
      mockOn(AmazonBook, 'validateDocumentIsNotCaptcha')
      await AmazonBook.buildFromUrl('dummy')
      expect(mock).toHaveBeenCalledWith('dummy')
    })
  })

  describe('buildFromFile', () => {
    it('calls helpers.remoteDocument', async () => {
      const mock = mockOn(helpers, 'localDocument')
      mockOn(AmazonBook, 'validateDocumentIsNotCaptcha')
      await AmazonBook.buildFromFile('dummy')
      expect(mock).toHaveBeenCalledWith('dummy')
    })
  })
})
