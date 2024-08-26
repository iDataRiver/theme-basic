const wrapMapi = async (event) => {
  const mapis = [
    '/api/merchant/basicInfo',
    '/api/merchant/info',
    '/api/order/info',
    '/api/order/add',
    '/api/order/pay',
    '/api/order/search',
  ]

  const purePath = event.path.split('?')[0]
  const isMapi = mapis.includes(purePath)
  const config = useRuntimeConfig()

  if (isMapi) {
    const requestOptions = {
      method: event.method,
      headers: {
        'Authorization': `Bearer ${config.idatariverMerchantSecret}`,
        'x-idr-locale': getHeader(event, 'X-Idr-Locale'),
        'Referer': getHeader(event, 'Referer'),
        'User-Agent': getHeader(event, 'User-Agent'),
      },
      credentials: 'include',
    }
    if (event.method == 'POST') {
      const body = await readBody(event)
      requestOptions.headers['content-type'] = 'application/json'
      requestOptions.body = JSON.stringify(body)
    }

    // use post method for pay
    if (purePath == '/api/order/pay') {
      requestOptions.method = 'POST'
      requestOptions.headers['content-type'] = 'application/json'
      requestOptions.headers['x-idr-locale'] = getQuery(event).locale
      requestOptions.body = JSON.stringify(getQuery(event))
    }

    event.idatariverReq = {
      url: `${config.public.idatariverServer}${event.path}`.replace('/api/', '/mapi/').replace('//', '/'),
      requestOptions: requestOptions,
    }

    // custom mapi cache rule
    if (['/api/merchant/basicInfo', '/api/merchant/info'].includes(purePath)) {
      event.idatariverReq.cacheKey = `${purePath}-${getHeader(event, 'X-Idr-Locale')}` // without query params
    } else if (['/api/order/search'].includes(purePath)) {
      event.idatariverReq.cacheKey = event.path // with query params
    }
  }
}

export default defineEventHandler(async (event) => {
  await wrapMapi(event)
})
