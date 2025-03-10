import Command, { Flags, FLAG_LOAD_PARAMS, FLAG_SAVE_PARAMS } from '../../base'
import { clApi, clColor, clUtil } from '@commercelayer/cli-core'
import type { CommerceLayerClient, QueryParamsRetrieve } from '@commercelayer/sdk'
import { addRequestReader, isRequestInterrupted } from '../../lang'
import { mergeCommandParams } from '../../commands'


const OPERATION = 'create'

export default class ResourcesCreate extends Command {

  static description = 'create a new resource'

  static aliases = [OPERATION, 'rc', 'res:create', 'post']

  static examples = [
    '$ commercelayer resources:create customers -a email=user@test.com',
    '$ clayer res:create customers -a email="user@test-com" -r customer_group=customer_groups/<customerGroupId>',
    '$ cl create customers -a email=user@test.com -m meta_key="meta value"',
    '$ cl rc customers -D /path/to/data/file/data.json'
  ]

  static flags = {
    ...Command.flags,
    attribute: Flags.string({
      char: 'a',
      description: 'define a resource attribute [name=value]',
      multiple: true
    }),
    object: Flags.string({
      char: 'O',
      description: 'define a resource object attribute',
      multiple: true
    }),
    'json-object': Flags.string({
      char: 'J',
      description: 'define a resource object attribute in JSON format (value enclosed in single quotes)',
      multiple: true
    }),
    relationship: Flags.string({
      char: 'r',
      description: 'define a relationship with another resource',
      multiple: true
    }),
    metadata: Flags.string({
      char: 'm',
      description: 'define a metadata attribute or a set of metadata attributes',
      multiple: true
    }),
    data: Flags.string({
      char: 'D',
      description: 'the data file to use as request body',
      multiple: false,
      exclusive: ['attribute', 'relationship', 'metadata', 'doc', 'object', 'json-object', FLAG_LOAD_PARAMS, FLAG_SAVE_PARAMS]
    }),
    tags: Flags.string({
      char: 't',
      description: 'list of tags associated with the resource',
      multiple: true
    })
  }


  static args = {
    ...Command.args
  }



  async run(): Promise<any> {

    const { args, flags } = await this.parse(ResourcesCreate)

    const resource = this.checkResource(args.resource, { singular: true })

    const loadParams = flags[FLAG_LOAD_PARAMS]
    const saveCmd = flags[FLAG_SAVE_PARAMS]
    if (saveCmd) this.checkAlias(saveCmd, resource.api, OPERATION, this.config)
    const showHeaders = flags.headers || flags['headers-only']

    // Raw request
    if (flags.data) {
      try {

        const baseUrl = clApi.baseURL('core', flags.organization, flags.domain)
        const accessToken = flags.accessToken
        const dataPath = clUtil.specialFolder(flags.data)

        const rawData = clApi.request.readDataFile(dataPath)
        if (!rawData?.data) this.error('Empty data file')
        if (!rawData.data.type) rawData.data.type = resource.api

        const rawRes = await clApi.request.raw({ operation: clApi.Operation.Create, baseUrl, accessToken, resource: resource.api }, rawData)

        const out = flags.raw ? rawRes : clApi.response.denormalize(rawRes)
        this.printOutput(out, flags)
        this.log(`\n${clColor.style.success('Successfully')} created new resource of type ${clColor.style.resource(resource.api)} with id ${clColor.style.id(rawRes.data.id)}\n`)

        return out

      } catch (error) {
        this.printError(error, flags, args)
      }
    }


    const cl = this.initCommerceLayer(flags)

    // Attributes flags
    const attributes = this.attributeFlag(flags.attribute)
    // Objects flags
    const objects = this.objectFlag(flags.object)
    if (flags['json-object']) {
      const json = this.jsonFlag(flags['json-object'], objects)
      Object.assign(objects, json)
    }
    // Relationships flags
    const relationships = this.relationshipFlag(flags.relationship, flags.organization)
    // Metadata flags
    const metadata = this.metadataFlag(flags.metadata, { fixTypes: true })

    // Relationships
    if (relationships && (Object.keys(relationships).length > 0)) Object.entries(relationships).forEach(([key, value]) => {
      const relSdk: any = cl[value.type as keyof CommerceLayerClient]
      const rel = relSdk.relationship(value)
      attributes[key] = rel
    })

    // Objects
    if (objects && (Object.keys(objects).length > 0)) {
      for (const o of Object.keys(objects)) {
        if (Object.keys(attributes).includes(o)) this.warn(`Object ${o} will overwrite attribute ${o}`)
        else attributes[o] = objects[o]
      }
    }

    // Metadata
    if (metadata && (Object.keys(metadata).length > 0)) {
      if (attributes.metadata) this.warn(`Attribute ${clColor.style.attribute('metadata')} will be overwritten by the content defined with the flag ${clColor.style.flag('-m')}`)
      attributes.metadata = metadata
    }

    // Tag flags
    if (flags.tags) {
      this.checkTag(resource.api)
      const tags = this.tagFlag(flags.tags)
      if (tags) attributes.tags = tags.map(t => cl.tags.relationship(t))
    }

    // Include flags
    const include: string[] = this.includeFlag(flags.include, relationships, flags['force-include'])
    // Fields flags
    const fields = this.fieldsFlag(flags.fields, resource.api)


    const rawReader = flags.raw ? cl.addRawResponseReader({ headers: showHeaders }) : undefined
    const reqReader = flags.doc ? addRequestReader(cl) : undefined

    const params: QueryParamsRetrieve = {}

    try {

      const resSdk: any = cl[resource.api as keyof CommerceLayerClient]
      this.checkOperation(resSdk, OPERATION)

      if (include && (include.length > 0)) params.include = include
      if (fields && (Object.keys(fields).length > 0)) params.fields = fields


      // Load saved command arguments
      if (loadParams) {
        const savedParams = this.loadParams(loadParams, resource.api, OPERATION)
        if (savedParams) mergeCommandParams(params, savedParams)
      }


      const res = await resSdk.create(attributes, params)

      // Save last resource id
      if (res?.id) this.lastResources(flags.organization, { [res.type]: res.id })

      const out = (flags.raw && rawReader) ? rawReader.rawResponse : res

      this.printHeaders(rawReader?.headers, flags)
      this.printOutput(out, flags)

      this.log(`\n${clColor.style.success('Successfully')} created new resource of type ${clColor.style.resource(resource.api)} with id ${clColor.style.id(res.id)}\n`)


      // Save command arguments
      if (saveCmd) this.saveParams(saveCmd, { type: resource.type }, OPERATION, params)


      return out

    } catch (error) {
      if (isRequestInterrupted(error) && reqReader) {
        await this.showLiveDocumentation(reqReader.request, params, flags)
        cl.removeInterceptor('request', reqReader.id)
      } else this.printError(error)
    }

  }

}
