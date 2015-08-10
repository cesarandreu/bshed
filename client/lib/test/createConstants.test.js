import createConstants from '../createConstants'
import { describe, it } from 'mocha'
import expect from 'expect.js'

describe('createConstants', () => {
  it('sets the prefix', () => {
    const { CONSTANT } = createConstants('PREFIX', {
      CONSTANT: null
    })
    expect(CONSTANT).to.equal('PREFIX_CONSTANT')
  })

  it('sets the value string, regardlesss of the original value', () => {
    const { NUMBER, STRING, OBJECT, NULL, UNDEFINED } = createConstants('TEST', {
      NULL: null,
      NUMBER: 10,
      STRING: '',
      OBJECT: {},
      UNDEFINED: undefined
    })

    expect(NULL).to.equal('TEST_NULL')
    expect(NUMBER).to.equal('TEST_NUMBER')
    expect(STRING).to.equal('TEST_STRING')
    expect(OBJECT).to.equal('TEST_OBJECT')
    expect(UNDEFINED).to.equal('TEST_UNDEFINED')
  })
})
