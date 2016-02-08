// import { Card } from 'components/Card'
import { LayoutToolbar, PageLayoutContainer } from 'components/Layout'
import React, { Component } from 'react'
import styles from './Components.css'

// Get all files that end with .example.js
const requireExamples = require.context('client', true, /\.example\.js$/)

// This is the list of component examples
const componentExamples = requireExamples.keys().map((examplePath) => {
  // Get the component title based on the path
  // Split by `/`, take the last element
  // Split by `.`, take the first element
  // Input: 'app/Foo/Foo.example.js'
  // Output: 'Foo'
  const name = examplePath.split('/').pop().split('.').shift()

  // Require the example and make sure it can be rendered
  const ComponentExample = requireExamples(examplePath).default
  if (typeof ComponentExample !== 'function') {
    throw new Error(`The default export in "${examplePath}" is not a valid react component`)
  }

  return {
    ComponentExample,
    name
  }
})
.sort((a, b) => a.name.localeCompare(b.name))

export default class Components extends Component {
  render () {
    return (
      <PageLayoutContainer
        fixed
        toolbar={
          <LayoutToolbar title='Components'/>
        }
      >
        <div className={styles.page}>
          {componentExamples.map(({ ComponentExample, name }) =>
            <ComponentExample key={name}/>
          )}
        </div>
      </PageLayoutContainer>
    )
  }
}
