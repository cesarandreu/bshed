import TestUtils from 'react-addons-test-utils'
import Display from './Display'
import React from 'react'
import test from 'tape'

test('Component: Display', t => {
  t.plan(6)

  const renderer = TestUtils.createRenderer()
  const variations = [{
    variation: 1,
    type: 'h3'
  }, {
    variation: 2,
    type: 'h2'
  }, {
    variation: 3,
    type: 'h1'
  }]

  variations.forEach(({ variation, type }) => {
    renderer.render(
      <Display variation={variation}>
        {`display ${variation}`}
      </Display>
    )
    const display = renderer.getRenderOutput()
    t.equal(
      display.type, type,
      `Display variation ${variation} is an ${type} element`
    )
    t.equal(
      display.props.children, `display ${variation}`,
      `Display variation ${variation} renders its child`
    )
  })
})
