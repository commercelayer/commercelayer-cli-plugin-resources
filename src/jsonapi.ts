
const findIncluded = (rel: any, included: any[]): any => {
	return included.find(inc => {
		return (rel.id === inc.id) && (rel.type === inc.type)
	})
}


const denormalizeResource = (res: any, included: any[]): any => {

	const resource = {
		id: res.id,
		type: res.type,
		...res.attributes,
	}

	if (res.relationships) Object.keys(res.relationships).forEach(key => {
		const rel = res.relationships[key].data
		if (rel) {
			if (Array.isArray(rel)) resource[key] = rel.map(r => denormalizeResource(findIncluded(r, included), included))
			else resource[key] = denormalizeResource(findIncluded(rel, included), included)
		}  else if (rel === null) resource[key] = null
	})

	return resource

}


const denormalize = (response: any): any => {

	let denormalizedResponse

	if (response.links) delete response.links

	const data = response.data
	const included = response.included

	if (Array.isArray(data)) denormalizedResponse = data.map(res => denormalizeResource(res, included))
	else denormalizedResponse = denormalizeResource(data, included)

	return denormalizedResponse

}


/*
const includedResource = (rel: { id: any; type: any }, included: any[]) => {
  return included.find(inc => {
	return (rel.id === inc.id) && (rel.type === inc.type)
  })
}
*/



export { denormalize }
