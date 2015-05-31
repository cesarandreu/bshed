module.exports = {
  testdom,
  cleanup
}

function testdom (markup='') {
  if (typeof document === 'undefined') {
    const jsdom = require('jsdom').jsdom
    global.document = jsdom(markup)
    global.window = document.defaultView
    global.navigator = window.navigator
  }
}

function cleanup () {
  const React = require('react')
  React.unmountComponentAtNode(document.body)
  document.body.innerHTML = ''
}
