import {expect, test} from '@oclif/test'

describe('resources:available', () => {
  test
  .stdout()
  .command(['resources:available'])
  .it('runs resources:available', ctx => {
    expect(ctx.stdout).to.contain('-= Commerce Layer API available resources =-').and.contain('addresses')
  })
})
