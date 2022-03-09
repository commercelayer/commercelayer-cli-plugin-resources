import Command, { FLAG_LOAD_PARAMS, FLAG_SAVE_COMMAND, CliUx } from '../../base'
import commercelayer, { CommerceLayerClient, QueryParamsList } from '@commercelayer/sdk'
import { addRequestReader, isRequestInterrupted } from '../../lang'
import { mergeCommandParams } from '../../commands'
import ResourcesList from './list'
import { clColor } from '@commercelayer/cli-core'
import { pluralize } from '../../inflector'


const OPERATION = 'relationship'


export default class ResourcesRelationship extends Command {

  static description = 'fetch a resource relationship'

  static aliases = [OPERATION, 'resources:rel', 'res:rel', 'res:relationship', 'relationship']

  static hidden = true

  static examples = [
    '$ commercelayer resources:relationship customers <customerId> customer_group',
    '$ clayer res:relationship customers <customerId> orders',
    '$ cl res:rel customers <customerId> orders -w status_eq=pending',
    '$ cl relationship customers <customerId> <customerRelationship>',
  ]

  static flags = {
    ...ResourcesList.flags,
  }

  static args = [
    ...Command.args,
    { name: 'id', description: 'id of the resource to retrieve', required: true },
    { name: 'relationship', description: 'name of the relationship field', required: true },
  ]


  async run() {

    const { args, flags } = await this.parse(ResourcesRelationship)

    const { res: resName, id } = this.checkResourceId(args.resource, args.id)
    const resource = this.checkResource(resName, { singular: true })

    const relationship = args.relationship
    const multiRel = this.isRelationship1N(relationship)

    const organization = flags.organization
    const domain = flags.domain
    const accessToken = flags.accessToken

    const cl = commercelayer({ organization, domain, accessToken })

    const resSdk: any = cl[resource.api as keyof CommerceLayerClient]
    this.checkRelationship(resSdk, relationship)

    // Load saved args
    const loadParams = flags[FLAG_LOAD_PARAMS]
    const saveCmd = flags[FLAG_SAVE_COMMAND]
    if (saveCmd) this.checkAlias(saveCmd, resource.api, OPERATION, this.config)


    // Include flags
    const include: string[] = this.includeFlag(flags.include)
    // Fields flags
    const fields = this.fieldsFlag(flags.fields, resource.api)
    // Where flags
    const wheres = this.whereFlag(flags.where)
    // Sort flags
    const sort = this.sortFlag(flags.sort)

    const page = flags.page
    const perPage = flags.pageSize

    const rawReader = flags.raw ? cl.addRawResponseReader() : undefined
    const reqReader = flags.doc ? addRequestReader(cl) : undefined

    const params: QueryParamsList = {}

    try {

      if (include && (include.length > 0)) params.include = include
      if (fields && (Object.keys(fields).length > 0)) params.fields = fields
      if (wheres && (Object.keys(wheres).length > 0)) params.filters = wheres
      if (sort && (Object.keys(sort).length > 0)) params.sort = sort
      if (perPage && (perPage > 0)) params.pageSize = perPage
      if (page && (page > 0)) params.pageNumber = page


      // Load saved command arguments
      if (loadParams) {
        const savedParams = this.loadParams(loadParams, resource.api, OPERATION)
        if (savedParams) mergeCommandParams(params, savedParams)
      }


      if (!flags.doc && multiRel) CliUx.ux.action.start(`Fetching ${resource.api.replace(/_/g, ' ')}.${relationship} for id ${id}`)

      const res = await resSdk[relationship](id, params)
      if (multiRel)  CliUx.ux.action.stop()

      const out = (flags.raw && rawReader) ? rawReader.rawResponse : (multiRel ? [...res] : res)

      if (out && flags.extract) {
        const ext = this.extractFlag(flags.extract)
        if (Array.isArray(out))  out.forEach(o => this.extractObjectFields(ext, o))
        else this.extractObjectFields(ext, out)
      }

      if (!out || (out.length === 0)) this.log(clColor.italic(`\nRelationship ${clColor.api.resource(`${resName}.${relationship}`)} is empty\n`))
      else {
        this.printOutput(out, flags)
        if (multiRel) this.log(`\nRecords: ${clColor.blueBright(out.length)} of ${res.meta.recordCount} | Page: ${clColor.blueBright(String(flags.page || 1))} of ${res.meta.pageCount}\n`)
        if (flags.save || flags['save-path']) this.saveOutput(out, flags)
      }


       // Save command srguments
       if (saveCmd) this.saveParams(saveCmd, { type: resource.api, id }, OPERATION, params)


      return out

    } catch (error) {
      if (isRequestInterrupted(error) && reqReader) {
        this.showLiveDocumentation(reqReader.request, params, flags)
        cl.removeInterceptor('request', reqReader.id)
      } else this.printError(error, flags, args)
    }

  }


  private checkRelationship(sdk: any, name: string): boolean {
    if (!sdk[name]) this.error(`Relationship not available for resource ${clColor.api.resource(sdk.type())}: ${clColor.msg.error(name)}`)
    return true
  }

  private isRelationship1N(name: string): boolean {
    return (name === pluralize(name))
  }

}