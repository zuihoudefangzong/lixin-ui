import chai, { expect } from 'chai'

import sinonChai from 'sinon-chai'

chai.use(sinonChai)

import validator from '../../src/core/validator'

describe('validator', ()=> {
  it('存在', () => {
    expect(validator).to.exist
  })

  it('test email is number 0', () => {
    let data = {
      email: 0,
    }
    let rules = [
      { 
        key: 'email',
        required: true
      }
    ]
    let errors = validator(data, rules)
    expect(errors.email).to.not.exist
  })
})