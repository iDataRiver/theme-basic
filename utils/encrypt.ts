import CryptoJS from 'crypto-js';


export const encryptReq = (path: string): any => {
  const config = useRuntimeConfig()
  let payload: any = {
    _t: Date.now(),
    secret: config.public.apiEncryptKey,
    path: path,
  }
  const sortedKeys = Object.keys(payload).sort()
  let signStr = ''
  for (let index = 0; index < sortedKeys.length; index++) {
    const key = sortedKeys[index];
    const value = typeof payload[key] === 'object' ? key : payload[key]
    signStr = `${signStr}${key}=${value}`
  }

  return payload._t + ':' + CryptoJS.MD5(signStr).toString().toUpperCase()
}