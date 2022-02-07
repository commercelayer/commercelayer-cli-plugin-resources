import Command, { Flags, FLAG_LOAD_PARAMS, FLAG_SAVE_COMMAND, CliUx } from '../../base'
import commercelayer, { CommerceLayerClient, QueryParamsList } from '@commercelayer/sdk'
import { addRequestReader, isRequestInterrupted } from '../../lang'
import { mergeCommandParams } from '../../commands'
import { clColor } from '@commercelayer/cli-core'


const OPERATION = 'list'


export default class ResourcesList extends Command {

	static description = 'fetch a collection of resources'

	static aliases = [OPERATION, 'rl', 'res:list']

	static examples = [
		'$ commercelayer resources:list customers -f id,email -i customer_group -s updated_at',
		'$ cl res:list -i customer_group -f customer_groups/name -w customer_group_name_eq="GROUP NAME"',
		'$ cl list -p 5 -n 10 -s -created_at --raw',
	]

	static flags = {
		...Command.flags,
		where: Flags.string({
			char: 'w',
			multiple: true,
			description: 'comma separated list of query filters',
		}),
		page: Flags.integer({
			char: 'p',
			description: 'page number',
		}),
		pageSize: Flags.integer({
			char: 'n',
			description: 'number of elements per page',
		}),
		sort: Flags.string({
			char: 's',
			description: 'defines results ordering',
			multiple: true,
		}),
		save: Flags.string({
			char: 'x',
			description: 'save command output to file',
			multiple: false,
			exclusive: ['save-path'],
		}),
		'save-path': Flags.string({
			char: 'X',
			description: 'save command output to file and create missing path directories',
			multiple: false,
			exclusive: ['save'],
		}),
    extract: Flags.string({
      char: 'e',
      description: 'extract subfields from object attributes',
      multiple: true,
      exclusive: ['raw'],
    }),
	}

	static args = [
		...Command.args,
	]


	async run() {

		const { args, flags } = await this.parse(ResourcesList)

		const resource = this.checkResource(args.resource)

    const loadParams = flags[FLAG_LOAD_PARAMS]
    const saveCmd = flags[FLAG_SAVE_COMMAND]
    if (saveCmd) this.checkAlias(saveCmd, resource.api, OPERATION, this.config)


		// const baseUrl = baseURL(flags.organization, flags.domain)
		const organization = flags.organization
		const domain = flags.domain
		const accessToken = flags.accessToken


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


		const cl = commercelayer({ organization, domain, accessToken })

		const rawReader = flags.raw ? cl.addRawResponseReader() : undefined
		const reqReader = flags.doc ? addRequestReader(cl) : undefined

		const params: QueryParamsList = {}

		try {

			const resSdk: any = cl[resource.api as keyof CommerceLayerClient]
			this.checkOperation(resSdk, 'list')

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


			if (!flags.doc) CliUx.ux.action.start(`Fetching ${resource.api.replace(/_/g, ' ')}`)
			const res = await resSdk.list(params)
			CliUx.ux.action.stop()

			const out = (flags.raw && rawReader) ? rawReader.rawResponse : [...res]
			const meta = res.meta


			if (res && (res.length > 0)) {

        if (flags.extract && Array.isArray(out)) {
          const ext = this.extractFlag(flags.extract)
          out.forEach(o => this.extractObjectFields(ext, o))
        }

				this.printOutput(out, flags)
				this.log(`\nRecords: ${clColor.blueBright(res.length)} of ${meta.recordCount} | Page: ${clColor.blueBright(String(flags.page || 1))} of ${meta.pageCount}\n`)

        // Save command output
        if (flags.save || flags['save-path']) this.saveOutput(out, flags)

			} else this.log(clColor.italic('\nNo records found\n'))


      // Save command arguments
      if (saveCmd) this.saveParams(saveCmd, { type: resource.api }, OPERATION, params)


			return out

		} catch (error) {
			if (isRequestInterrupted(error) && reqReader) {
				this.showLiveDocumentation(reqReader.request, params, flags)
				cl.removeInterceptor('request', reqReader.id)
			} else this.printError(error)
		}

	}

}
