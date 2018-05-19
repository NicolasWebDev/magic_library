import helpers from '../src/helpers'

jest.mock('node-fetch')

describe('helpers', () => {
  describe('remoteDocument', () => {
    it('creates a jsdom fragment on the result of downloadHtml', () => {
      const spy = jest.spyOn(helpers, 'downloadHtml')
        .mockImplementation(() => 'dummyResult')
      helpers.remoteDocument('dummyInput')
      expect(spy).toHaveBeenCalledWith('dummyInput')
    })
  })
})
