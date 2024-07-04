import CryptoJS from 'crypto-js';

export const encryptReq = (path, ts, secret) => {
  let payload = {
    _t: ts,
    secret: secret,
    path: path,
  }

  const sortedKeys = Object.keys(payload).sort()
  let signStr = ''
  for (let index = 0; index < sortedKeys.length; index++) {
    const key = sortedKeys[index];
    const value = typeof payload[key] === 'object' ? key : payload[key]
    signStr = `${signStr}${key}=${value}`
  }
  return CryptoJS.MD5(signStr).toString().toUpperCase()
}

const isValidSign = (event) => {
  try {
    let sign = getHeader(event, 'X-Sign') || event.path.split('&_sign=')[1].split('&')[0]
    sign = decodeURIComponent(sign) // vercel may conver `:` to `%3A`

    const ts = sign.split(':')[0]
    if (Date.now() - Number(ts) > 1000 * 3600) { // max valid in 3600s
      console.log('sign expired')
      return false
    }
    const raw = sign.split(':')[1]

    const config = useRuntimeConfig()

    const correctSign = encryptReq(event.path.split('?')[0], ts, config.public.apiEncryptKey)
    return raw === correctSign
  } catch (error) {
    console.error(error)
    return false
  }
}


export default defineEventHandler(async (event) => {
  // check sign
  if (!isValidSign(event)) { return 'illegal.' }

  if (!event.idatariverReq) { return 'Not Found.' }

  if (event.idatariverReq.cacheKey) {
    return await cachedMapi(event, event.idatariverReq.cacheKey)
  }

  const result = await $fetch(event.idatariverReq.url, event.idatariverReq.requestOptions).catch((error) => console.log(error.data))

  // mapi redirect json response
  if (result.redirectUrl) {
    return await sendRedirect(event, result.redirectUrl)
  }

  return result
})
