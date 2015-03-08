'use strict'

module.exports = function testdom (markup='') {
  if (typeof document === 'undefined') {
    var {jsdom} = require('jsdom')
    global.document = jsdom(markup)
    global.window = document.parentWindow
  }
}
