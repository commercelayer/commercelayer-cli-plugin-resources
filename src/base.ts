import Command, { flags } from '@oclif/command'
import ResourcesAvailable, { findResource, Resource } from './commands/resources/available'
import { filterAvailable } from './commands/resources/filters'
import chalk from 'chalk'
import { inspect } from 'util'
import _ from 'lodash'

export default abstract class extends Command {

	static flags = {
		organization: flags.string({
			char: 'o',
			description: 'the slug of your organization',
			required: true,
			env: 'CL_CLI_ORGANIZATION',
		}),
		domain: flags.string({
			char: 'd',
			required: false,
			hidden: true,
			dependsOn: ['organization'],
			env: 'CL_CLI_DOMAIN',
		}),
		accessToken: flags.string({
			hidden: true,
			required: true,
			env: 'CL_CLI_ACCESS_TOKEN',
		}),
		json: flags.boolean({
			char: 'j',
			description: 'convert output in standard JSON format',
			hidden: true,
		}),
		unformatted: flags.boolean({
			char: 'u',
			description: 'print unformatted JSON output',
			dependsOn: ['json'],
			hidden: true,
		}),
	}


	static args = [
		{ name: 'resource', description: 'the resource type', required: true },
	]


	checkResource(res: string, required = true): Resource | undefined {
		if (!res && required) this.error('Resource type not defined')
		const resource = findResource(res)
		if (resource === undefined) this.error(`Invalid resource ${chalk.red(res)}`,
			{ suggestions: [`Execute command ${chalk.italic('resources:available')} (or ${chalk.italic(ResourcesAvailable.aliases.join(', '))}) to get a list of all available CLI resources`] }
		)
		return resource
	}


	checkResourceId(resource: string, resourceId: string, required = true): any {

		let res = resource
		let id = resourceId

		const si = res.indexOf('/')
		if (si >= 0) {
			const rt = res.split('/')
			if (id && rt[1]) this.error(`Double definition of resource id: [${res}, ${id}]`, {
				suggestions: [`Define resource id as command argument (${chalk.italic(id)}) or as part of the resource itself (${chalk.italic(res)}) but not both`],
			})
			else id = rt[1]
			res = rt[0]
		}

		if (!id && required) this.error('Resource id not defined')

		return {
			res,
			id,
		}

	}


	includeValuesArray(flag: string[]): string[] {
		const values: string[] = []
		if (flag) {
			const flagValues = flag.map(f => f.split(',').map(t => t.trim()))
			flagValues.forEach(a => values.push(...a))
			if (values.some(f => f.split('.').length > 3)) this.error('Can be only included resources within the 3rd level of depth')
		}
		return values
	}


	fieldsValuesMap(flag: string[]): Map<string, string[]> {

		const fields = new Map<string, string[]>()

		if (flag && (flag.length > 0)) {
			flag.forEach(f => {
				if (f.indexOf('/') > -1) {

					const kv = f.split('/')

					if (kv.length > 2) this.error('Can be defined only one resource for each fields flag',
						{ suggestions: [`Split the value ${chalk.italic(f)} into two fields flags`] }
					)

					const res = kv[0].replace('[', '').replace(']', '')
					this.checkResource(res)
					/*
					if (res.split('.').length > 3) this.error('Can be defined only resources within the 3rd level',
						{ suggestions: [`Reduce total depth of the requested resource ${chalk.italic(res)}`] }
					)
					*/

					const values = kv[1].split(',').map(v => v.trim())
					if (values[0].trim() === '') this.error(`No fields defined for resource ${chalk.italic(res)}`)

					if (fields.get(res) === undefined) fields.set(res, [])
					fields.get(res)?.push(...values)

				} else {
					if (fields.get('__self') === undefined) fields.set('__self', [])
					fields.get('__self')?.push(...f.split(',').map(v => v.trim()))
				}
			})
		}

		return fields

	}


	mapToObject(map: Map<string, any>): any {

		const object: any = {}

		map.forEach((val, key) => {
			const k = key as keyof object
			if (object[k] === undefined) object[k] = val
			else object[k] = [...val, object[k]]
		})

		return object

	}


	mapToSdkParam(map: Map<string, any>): any[] {

		const param: any[] = map.get('__self') as any[] || []
		let subfields: any = null

		map.forEach((val, key) => {
			if (key !== '__self') {
				if (subfields === null) subfields = {}
				if (subfields[key] === undefined) subfields[key] = val
				else subfields[key] = [...val, subfields[key]]
			}
		})

		if (subfields !== null) param.push(subfields)

		return param

	}


	mapToSdkParamExtended(map: Map<string, string[]>): any[] {

		const param: any[] = map.get('__self') as any[] || []
		let subfields: any = null

		map.forEach((val, key) => {
			if (key !== '__self') {
				if (subfields === null) subfields = {}
				const kt = key.split('.')
				let s = subfields
				for (let i = 0; i < kt.length; i++) {
					const k = kt[i]
					if (i === (kt.length - 1)) {
						if (s[k] === undefined) s[k] = val
						else s[k] = [...val, s[k]]
					} else
						if (s[k] === undefined) s = s[k] = {}
						else
							if (Array.isArray(s[k])) {
								const o = s[k].find((x: any) => (typeof x === 'object'))
								if (o === undefined) s[k].push(s = {})
								else s = o
							} else s = s[k]
				}
			}
		})

		if (subfields !== null) param.push(subfields)

		return param

	}


	whereValuesMap(flag: string[]): Map<string, string> {

		const wheres = new Map<string, string>()

		if (flag && (flag.length > 0)) {
			flag.forEach(f => {

				/*
				const po = f.indexOf('(') + 1
				const pc = f.indexOf(')') + 1
				if ((po < 2) || (pc < f.length) || (po > pc)) this.error(`Filter flag must be in the form ${chalk.italic('predicate(value)')}`)
				*/

				let sepChar = '/'
				let si = f.indexOf(sepChar)
				if (si < 0) {
					sepChar = '='
					si = f.indexOf(sepChar)
					if (si < 0) this.error(`Filter flag must be in the form ${chalk.italic('predicate/value')} or ${chalk.italic('predicate=value')}`)
				}

				// const wt = f.split('(')
				const wt = f.split(sepChar)
				const w = wt[0]
				if (!filterAvailable(w)) this.error(`Invalid query filter: ${chalk.red(w)}`,
					{
						suggestions: [`Execute command ${chalk.italic('resources:filters')} to get a full list of all available filter predicates`],
						ref: 'https://docs.commercelayer.io/api/filtering-data#list-of-predicates',
					}
				)

				// const v = wt[1].substring(0, (wt[1].length - 1))
				const v = wt[1]

				wheres.set(w, v)

			})
		}

		return wheres

	}


	orderingValuesMap(flag: string[]): Map<string, string> {

		const orderings = new Map<string, string>()

		if (flag && (flag.length > 0)) {

			if (flag.some(f => {
				const ft = f.split(',')
				return (ft.includes('asc') || ft.includes('desc'))
			})) {
				flag.forEach(f => {

					const ot = f.split(',')
					if (ot.length > 2) this.error('Can be defined only one field for each sort flag',
						{ suggestions: [`Split the value ${chalk.italic(f)} into two or more sort flags`] }
					)

					const of = ot[0]
					if (of.startsWith('-')) this.error('You cannot mix two ordering syntaxes',
						{ suggestions: [`Choose between the style ${chalk.italic('<field>,<order>')} and the style ${chalk.italic('[-]<field>')}`] }
					)
					const sd = ot[1] || 'asc'
					if (!['asc', 'desc'].includes(sd)) this.error(`Invalid sort flag: ${chalk.red(f)}`,
						{ suggestions: [`Sort direction can assume only the values ${chalk.italic('asc')} or ${chalk.italic('desc')}`] }
					)

					orderings.set(of, sd)

				})
			} else {
				flag.forEach(fl => {
					fl.split(',').forEach(f => {
						const desc = f.startsWith('-')
						const of = desc ? f.slice(1) : f
						const sd = desc ? 'desc' : 'asc'
						orderings.set(of, sd)
					})
				})
			}
		}

		return orderings

	}


	_simpleValuesMap(flag: string[], type = 'attribute'): Map<string, string> {

		const map = new Map<string, string>()

		if (flag && (flag.length > 0)) {
			flag.forEach(f => {

				const eqi = f.indexOf('=')
				if (eqi < 1) this.error(`Invalid ${type.toLowerCase()} ${chalk.red(f)}`, {
					suggestions: [`${_.capitalize(type)} flags must be defined using the format ${chalk.italic('name=value')}`],
				})

				const name = f.substr(0, eqi)
				const value = f.substr(eqi + 1)

				if (map.get(name)) this.warn(`${_.capitalize(type)} ${chalk.yellow(name)} has already been defined`)

				map.set(name, value)

			})
		}

		return map

	}


	attributeValuesMap(flag: string[]): any {
		return this._simpleValuesMap(flag, 'attribute')
	}


	relationshipValuesMap(flag: string[]): Map<string, any> {

		const relationships = new Map<string, any>()

		if (flag && (flag.length > 0)) {
			flag.forEach(f => {

				const rt = f.split('=')
				if (rt.length !== 2) this.error(`Invalid relationship flag: ${chalk.red(f)}`, {
					suggestions: [`Define the relationship using the format ${chalk.italic('attribute_name=resource_type/resource_id')}`],
				})
				const vt = rt[1].split('/')
				if (vt.length !== 2) this.error(`Invalid relationship flag: ${chalk.red(f)}`, {
					suggestions: [`Define the relationship value using the format ${chalk.italic('resource_type/resource_id')}`],
				})

				const name = rt[0]
				const type = vt[0]
				const id = vt[1]

				const res = this.checkResource(type)

				if (relationships.get(name)) this.warn(`Relationship ${chalk.yellow(name)} has already been defined`)

				relationships.set(name, { type, id, sdk: res?.sdk })

			})
		}

		return relationships

	}


	metadataValuesMap(flag: string[]): any {
		return this._simpleValuesMap(flag, 'metadata')
	}


	// OUTPUT //

	printOutput(output: any, flags: any) {
		if (output) this.log(flags.json ? JSON.stringify(output, null, (flags.unformatted ? undefined : 4)) : inspect(output, false, null, true))
	}

	printError(error: any) {

		let err = null

		if (error.response) {
			if (error.response.status === 401) this.error(chalk.bgRed(`${error.response.statusText} [${error.response.status}]`),
				{ suggestions: ['Execute login to get access to the selected resource'] }
			)
			else err = error.response.data.errors
		} else
		if (error.errors) err = error.errors().toArray()
		else
		if (error.toArray) err = error.toArray()
		else err = error

		if (err) this.error(inspect(err, false, null, true))

	}

}

export { flags }
