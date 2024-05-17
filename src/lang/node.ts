import type { QueryParams } from '@commercelayer/sdk'
import { clOutput } from '@commercelayer/cli-core'
import { type RequestData, getOperation } from './request'


const buildTypescript = (request: RequestData, params?: QueryParams, flags?: any): string => {

	const hasParams = params && (Object.keys(params).length > 0)
	const operation = getOperation(request)
  const qpSuffix = (operation.name === 'list') ? 'List' : 'Retrieve'
	const paramsImport = hasParams ? `, { QueryParams${qpSuffix} }` : ''

	let ts = `import commercelayer${paramsImport} from '@commercelayer/sdk'`

	ts += `\n\nconst organization = '${flags.organization}'`
	ts += `\nconst accessToken = '${flags.accessToken}'`
	if (flags.domain) ts += `\nconst domain = '${flags.domain}'`

	ts += `\n\nconst cl = commercelayer({ organization, accessToken${flags.domain ? ', domain' : ''} })`

	if (hasParams) ts += `\n\nconst params: QueryParams${qpSuffix} = ${clOutput.printObject(params, { color: false })}`

  const args: string[] = []
  if (operation.id) args.push(`'${operation.id}'`)
  if (hasParams) args.push('params')

	ts += `\n\ncl.${operation.resource}.${operation.name}(${args.join(', ')}).then(console.log)`

	return ts

}


export { buildTypescript }
