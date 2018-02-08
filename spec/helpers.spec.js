import helpers from '../src/helpers'
import fetch from 'node-fetch'

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

  describe('downloadHtml', () => {
    helpers.downloadHtml('dummyInput')
    expect(fetch).toHaveBeenCalledWith('dummyInput')
  })
})
