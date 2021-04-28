import { Command } from '@oclif/command'
import { findResource } from '../resources'
import axios from 'axios'
import cliux from 'cli-ux'
import chalk from 'chalk'


export default class ResourcesDoc extends Command {

  static description = 'show the online documentation of the resource in the browser'

  static aliases = ['res:doc', 'rdoc']

  static examples = [
    '$ commercelayer rdoc customers',
    '$ cl res:doc cusatomers',
  ]

  static flags = { }

  static args = [{ name: 'resource', required: true, description: 'the resource for wich you want to access the online documentation' }]

  async run() {

    const { args } = this.parse(ResourcesDoc)

    const resource = args.resource

    const res = findResource(resource, { singular: true })

    if (res) {
      const resourceUrl = `https://docs.commercelayer.io/api/resources/${res?.api}`
      axios.get(resourceUrl).then(() =>  cliux.open(resourceUrl)).catch(() => this.warn(`No online documentation available for the resource ${chalk.italic.redBright(resource)}`))
    } else this.warn(`Invalid resource ${chalk.italic.redBright(resource)}`)

  }

}
