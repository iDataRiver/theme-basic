const deal = async (url: string, requestOptions: any, isLoading: any) => {
  requestOptions.headers['x-idr-locale'] = useNuxtApp().$i18n.locale.value

  isLoading.value = true;

  if (process.client) await nextTick()

  let response: any = {}

  if (requestOptions.server) {
    const res: any = await useFetch(url, requestOptions).catch((error) => console.log(error.data))
    const { data } = res
    response = data.value
  } else {
    response = await $fetch(url, requestOptions).catch((error) => console.log(error.data))
  }

  isLoading.value = false
  const { code, result, msg } = response;

  if (process.client) {
    const alertError = useAlertError()
    const alertInfo = useAlertInfo()
    if (code === 1004) {
      const localePath = useLocalePath()
      navigateTo(localePath('/auth/signin'))
      alertError.value = useNuxtApp().$i18n.t('need_login')
    } else if (msg) {
      const msgI18n = msg.startsWith('i18n:') ? useNuxtApp().$i18n.t(msg.slice(5)) : msg
      if (code === 0) {
        alertInfo.value = msgI18n
      } else {
        alertError.value = msgI18n
      }
    }
  }
  const raw = response
  return { code, result, msg, raw }
}

const useReqGet = async (path: string, params: Object, server: boolean = false) => {
  const requestOptions: any = {
    method: 'GET',
    params: params,
    headers: { 'x-sign': encryptReq(path) },
    credentials: 'include',
    server: server,
  };
  const loading = useGetLoading()
  return deal(`${path}`, requestOptions, loading)
}

const useReqPost = async (path: string, payload: Object, server: boolean = false) => {
  const requestOptions: any = {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-sign': encryptReq(path) },
    body: JSON.stringify(payload),
    credentials: 'include',
    server: server,
  };
  const loading = usePostLoading()
  return deal(`${path}`, requestOptions, loading)
}

export { useReqPost, useReqGet }