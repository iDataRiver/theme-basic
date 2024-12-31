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

const dealPayOrder = async (event, res) => {
  const code = res.code
  const locale = getQuery(event).locale
  const redirectUrl = getQuery(event).redirectUrl
  const config = useRuntimeConfig()

  if (code == 0) {
    if (res.result && res.result.payUrl) {
      let payUrl = res.result.payUrl
      if (payUrl.startsWith('/')) {// Dawn
        payUrl = locale && locale != 'en' ? `${config.public.idatariver}/${locale}${payUrl}` : `${config.public.idatariver}${payUrl}`
      }
      return await sendRedirect(event, payUrl)
    }
    return await sendRedirect(event, redirectUrl)
  }

  const i18nMsg = res.msg.startsWith('i18n:') ? res.msg.split('i18n:')[1] : 'server_internal_exception'
  const tipUrl = locale == 'en' ? `/tip?code=${code}&i18n=${i18nMsg}` : `/${locale}/tip?code=${code}&i18n=${i18nMsg}`
  return await sendRedirect(event, tipUrl)
}

export default defineEventHandler(async (event) => {
  // check sign
  if (!isValidSign(event)) { return 'illegal.' }

  if (!event.idatariverReq) { return 'Not Found.' }

  if (event.idatariverReq.cacheKey) {
    return await cachedMapi(event, event.idatariverReq.cacheKey)
  }

  const result = await $fetch(event.idatariverReq.url, event.idatariverReq.requestOptions).catch((error) => console.log(error.data))

  // pay order api
  if (event.idatariverReq.url.includes('/mapi/order/pay')) {
    return dealPayOrder(event, result)
  }

  return result
})
