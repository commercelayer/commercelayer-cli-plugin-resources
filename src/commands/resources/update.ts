import Command, { flags } from '../../base'
import { baseURL } from '../../common'
import cl, { CLayer } from '@commercelayer/js-sdk'
import _ from 'lodash'
import chalk from 'chalk'

export default class ResourcesUpdate extends Command {

  static description = 'update a resource'

  static aliases = ['update', 'ru', 'res:update']

  static flags = {
    ...Command.flags,
    attribute: flags.string({
      char: 'a',
      description: 'define a resource attribute',
      multiple: true,
    }),
    relationship: flags.string({
      char: 'r',
      description: 'define a relationship with another resource',
      multiple: true,
    }),
    metadata: flags.string({
      char: 'm',
      description: 'define a metadata attribute or a set of metadata attributes',
      multiple: true,
    }),
    merge: flags.boolean({
      char: 'M',
      description: 'merge metadata attributues with fields already present in the remote resource',
      dependsOn: ['metadata'],
    }),
  }

  static args = [
    ...Command.args,
    { name: 'id', description: 'id of the resource to retrieve', required: false },
  ]


  async run() {

    const { args, flags } = this.parse(ResourcesUpdate)

    const { res, id } = this.checkResourceId(args.resource, args.id)

    const resource = this.checkResource(res)

    const baseUrl = baseURL(flags.organization, flags.domain)
    const accessToken = flags.accessToken


    // Attributes flags
    const attributes = this.mapToSdkObject(this.attributeValuesMap(flags.attribute))
    // Relationships flags
    const relationships = this.relationshipValuesMap(flags.relationship)
    // Metadata flags
    const metadata = this.mapToSdkObject(this.metadataValuesMap(flags.metadata))

    // Relationships
    if (relationships) relationships.forEach((value, key) => {
      const relSdk: any = (cl as CLayer)[value.sdk as keyof CLayer]
      const rel = relSdk.build({ id: value.id })
      attributes[_.camelCase(key)] = rel
    })

    // Metadata
    if (metadata && (Object.keys(metadata).length > 0)) attributes.metadata = metadata


    cl.init({ accessToken, endpoint: baseUrl })

    try {

      const resSdk: any = (cl as CLayer)[resource?.sdk as keyof CLayer]

      const remRes = await resSdk.find(id)

      // Metadata attributes merge
      if (flags.merge && remRes.metadata && (Object.keys(remRes.metadata).length > 0)) attributes.metadata = { ...remRes.metadata, ...metadata }

      const res = await remRes.update(attributes)

      /* */
      // const rawRes = await resSdk.find(res.id, { rawResponse: true })
      // this.printOutput(rawRes, flags)
      /* */
      // this.printOutput(res, flags)
      if (res.valid()) this.log(`\n${chalk.green.bold('Success!')}: Updated resource of type ${chalk.italic(resource?.api as string)} with id ${chalk.bold(res.id)}\n`)

      // return rawRes

    } catch (error) {
      this.printError(error)
    }

  }

}
