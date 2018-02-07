'use strict';

require('babel-polyfill');

var _jsdom = require('jsdom');

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var downloadHtml = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(givenUrl) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _nodeFetch2.default)(givenUrl);

          case 2:
            return _context.abrupt('return', _context.sent.text());

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function downloadHtml(_x) {
    return _ref.apply(this, arguments);
  };
}();

var remoteDocument = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _jsdom.JSDOM;
            _context2.next = 3;
            return downloadHtml(url);

          case 3:
            _context2.t1 = _context2.sent;
            return _context2.abrupt('return', _context2.t0.fragment.call(_context2.t0, _context2.t1));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function remoteDocument(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
  var bookUrl, document, bookTitle, reviewsRating, reviewsCount;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          bookUrl = process.argv[2];
          _context3.next = 3;
          return remoteDocument(bookUrl);

        case 3:
          document = _context3.sent;
          bookTitle = document.querySelector('#ebooksProductTitle').textContent;
          reviewsRating = document.querySelector('#acrPopover').getAttribute('title').replace(/(\d\.\d) out of 5 stars/, '$1').valueOf();
          reviewsCount = document.querySelector('#acrCustomerReviewText').textContent.replace(/(\d) customer reviews/, '$1').valueOf();

          console.log([bookTitle, reviewsRating, reviewsCount]);

        case 8:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined);
}))();