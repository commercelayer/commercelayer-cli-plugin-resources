import { expect } from 'chai'
import { runCommand } from '@oclif/test'


describe('resources:retrieve', () => {
  it('runs NoC', async () => {
    const { stdout } = await runCommand<{ name: string }>(['resources:noc'])
    expect(stdout).to.contain('-= NoC =-')
  }).timeout(15000)
})
