import { componentWillReceiveProps } from './NavigateContainer'
import { describe, it } from 'mocha'
import expect from 'expect.js'

describe('NavigateContainer', () => {
  it('calls clearNavigateTo and navigateTo in componentWillReceiveProps', () => {
    let transitionToArgs = null
    let clearNavigateToArgs = null

    componentWillReceiveProps({
      url: '/path',
      transitionTo (...args) { transitionToArgs = args},
      clearNavigateTo (...args) { clearNavigateToArgs = args}
    })

    expect(transitionToArgs.length).to.equal(1)
    expect(transitionToArgs[0]).to.equal('/path')
    expect(clearNavigateToArgs.length).to.equal(0)
  })

  it('calls clearNavigateTo and then navigateTo', () => {
    let calls = []
    componentWillReceiveProps({
      url: '/path',
      transitionTo (...args) { calls.push('transitionTo') },
      clearNavigateTo (...args) { calls.push('clearNavigateTo') }
    })

    expect(calls.length).to.equal(2)
    expect(calls[0]).to.equal('clearNavigateTo')
    expect(calls[1]).to.equal('transitionTo')
  })

  it('does nothing when url is null', () => {
    let count = 0
    componentWillReceiveProps({
      url: null,
      transitionTo () { count++ },
      clearNavigateTo () { count++ }
    })

    expect(count).to.equal(0)
  })
})
