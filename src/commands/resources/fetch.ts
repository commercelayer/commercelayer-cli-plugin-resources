import Command from '../../base'
import RetrieveCommand from './retrieve'
import ListCommand from './list'
import RelationshipCommand from './relationship'
import GetCommand from './get'


export default class ResourcesFetch extends Command {

  static description = 'retrieve a resource or list a set of resources'

  static aliases = ['fetch', 'res:fetch', 'rf']

  static examples = [
    '$ commercelayer resources:fetch customers',
    '$ commercelayer res:fetch customers',
    '$ clayer res:fetch customers/<customerId>',
    '$ cl fetch customers/<customerId>/<customerRelationship>',
    '$ cl fetch customers/{customerId}/orders aBcdEkYWx',
  ]

  static strict = false

  static flags = {
    ...RetrieveCommand.flags,
    ...ListCommand.flags,
  }

  static args = [
   { name: 'path', description: 'path (or URL) of the resource(s) to fetch', required: true },
   { name: 'id', description: 'resource id', required: false },
  ]


  async run() {

    const { args } = await this.parse(ResourcesFetch)

    const path = this.fixPath(args.path as string, args)
    const id = args.id

    // If no relationship is defined then run retrieve/list command
    const pathNodes = path.split('/') as string[]
    if (pathNodes.length < 3) return GetCommand.run(this.argv, this.config)

    // Build argv array to pass to Relationship command
    const relArgs = [ ...this.argv ]
    relArgs.splice(0, id ? 2 : 1, ...pathNodes)

    return RelationshipCommand.run(relArgs, this.config)

  }


  private fixPath(path: string, args: any, _flags?: any): string {

    // Remove base URL
    if (path.startsWith('http')) path = path.substring(path.indexOf('/api/') + 4)
    // Remove 'relationships' sub-path (usually part of 'self' link)
    if (path.includes('/relationships/')) path = path.replace('/relationships', '')
    // Remove leading slash
    if (path.startsWith('/')) path = path.substring(1)
    // Replace {resourceId} placeholder with actual resource id
    if (args.id) path = path.replace(/\{.*\}/g, args.id)

    return path

  }

}
