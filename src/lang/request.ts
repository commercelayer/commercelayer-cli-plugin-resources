import { type CommerceLayerClient, CommerceLayerStatic, type RequestObj } from '@commercelayer/sdk'
import { clText, type KeyValString } from '@commercelayer/cli-core'


type RequestData = {
  baseUrl: string
  path: string
  method: string
  headers?: any
  params?: URLSearchParams
  data?: any
}

type OperationData = {
  name: string
  id?: string
  resource: string
  relationship?: string
  oneToMany?: boolean
  method: string
}

type RequestReader = {
  id: number
  request: RequestData
}


class RequestInterrupted extends Error {

  readonly requestInterrupted = true

  constructor() {
    super('REQUEST_INTERRUPT')
  }

}


const addRequestReader = (cl: CommerceLayerClient, interrupt = true): RequestReader => {

  const reader: RequestReader = {
    id: -1,
    request: { baseUrl: '', path: '/', method: 'get', headers: {} }
  }

  function requestInterceptor(request: RequestObj): RequestObj {

    const c = request
    const x = reader.request

    x.path = c.url.pathname
    x.method = c.options.method || 'GET'
    x.headers = c.options.headers
    x.params = c.url.searchParams
    x.baseUrl = `${c.url.protocol}//${c.url.hostname}`
    x.data = c.options.body

    if (interrupt) throw new RequestInterrupted()

    return request

  }


  /* const interceptor = */ cl.addRequestInterceptor(requestInterceptor)
  reader.id = 1// interceptor

  return reader

}


const isRequestInterrupted = (error: unknown): boolean => {
  return (CommerceLayerStatic.isSdkError(error) && (error.source instanceof RequestInterrupted) && error.source.requestInterrupted)
}


export { addRequestReader, isRequestInterrupted }
export type { RequestReader, RequestData, OperationData }


export const getMethod = (request: RequestData): string => {
  return request.method?.toUpperCase()
}


export const getFullUrl = (request: RequestData): string => {
  let fullUrl = `${request.baseUrl}${request.path}`
  const params = request.params
  if (params && (params.size > 0)) {
    const qs: string[] = []
    params.forEach((v, k) => { qs.push(`${k}=${v}`) })
    fullUrl += `?${qs.join('&')}`
  }
  return fullUrl
}


export const getResource = (request: RequestData): string => {
  const match = request.path.match(/\/api\/[a-z_]*/g)
  const res = (match ? match[0] : request.path).replace('/api/', '')
  return res
}


export const getRelationship = (request: RequestData): string | undefined => {
  const i1 = request.path.indexOf('/')
  const il = request.path.lastIndexOf('/')
  return (i1 === il) ? undefined : request.path.substring(il + 1)
}


export const getHeaders = (request: RequestData): KeyValString => {
  /*
  const headers = { ...request.headers }
  for (const h of Object.keys(headers))
    if (['User-Agent', 'Content-Length'].includes(h)) delete headers[h]
  return headers
  */
  return {
    Accept: request.headers.Accept,
    'Content-Type': request.headers['Content-Type'],
    Authorization: request.headers.Authorization,
  }
}


export const getOperation = (request: RequestData): OperationData => {

  const res = getResource(request)
  const rel = getRelationship(request)
  const id = request.path.replace(res, '').replace(rel || '', '').replace(/\//g, '')
  const method = request.method.toLowerCase()
  const singleton = ['application', 'organization'].includes(res)

  const op: OperationData = {
    method,
    name: 'retrieve',
    resource: res,
    relationship: rel,
    id,
  }

  if (op.relationship) op.oneToMany = (clText.pluralize(op.relationship) === op.relationship)

  if (op.method === 'get') {
    if (singleton || (op.id && !op.relationship)) op.name = 'retrieve'
    else op.name = rel || 'list'
  } else
    if (method === 'patch') op.name = 'update'
    else
      if (method === 'post') op.name = 'create'
      else
        if (method === 'delete') op.name = 'delete'

  return op

}
