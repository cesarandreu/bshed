import { Blockquote, Text, Title, Display, Subhead, Headline } from './Text'
import TestUtils from 'react-addons-test-utils'
import React from 'react'
import test from 'tape'

test('Component: Blockquote', t => {
  t.plan(2)

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <Blockquote>
      blockquote
    </Blockquote>
  )

  const blockquote = renderer.getRenderOutput()
  t.equal(
    blockquote.type, 'blockquote',
    'Blockquote is a blockquote element'
  )
  t.equal(
    blockquote.props.children, 'blockquote',
    'Blockquote renders its child'
  )
})

test('Component: Text', t => {
  t.plan(2)

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <Text>
      text
    </Text>
  )

  const text = renderer.getRenderOutput()
  t.equal(
    text.type, 'p',
    'Text is a p element'
  )
  t.equal(
    text.props.children, 'text',
    'Text renders its child'
  )
})

test('Component: Subhead', t => {
  t.plan(2)

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <Subhead>
      subhead
    </Subhead>
  )

  const subhead = renderer.getRenderOutput()
  t.equal(
    subhead.type, 'h6',
    'Subhead is an h6 element'
  )
  t.equal(
    subhead.props.children, 'subhead',
    'Subhead renders its child'
  )
})

test('Component: Title', t => {
  t.plan(2)

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <Title>
      title
    </Title>
  )

  const title = renderer.getRenderOutput()
  t.equal(
    title.type, 'h5',
    'Title is an h5 element'
  )
  t.equal(
    title.props.children, 'title',
    'Title renders its child'
  )
})

test('Component: Headline', t => {
  t.plan(2)

  const renderer = TestUtils.createRenderer()
  renderer.render(
    <Headline>
      headline
    </Headline>
  )

  const headline = renderer.getRenderOutput()
  t.equal(
    headline.type, 'h4',
    'Headline is an h4 element'
  )
  t.equal(
    headline.props.children, 'headline',
    'Headline renders its child'
  )
})

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
