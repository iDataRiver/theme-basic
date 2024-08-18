// Basic
export const getBaseUrl = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : useRequestURL().origin
}

export const useContactTypes = () => {
  return useState('contactTypes', () => [
    { 'key': 'email', 'value': 'Email' },
    { 'key': 'telegram', 'value': 'Telegram' },
    { 'key': 'facebook', 'value': 'Facebook' },
    { 'key': 'x', 'value': 'X(Twitter)' },
    { 'key': 'whatsApp', 'value': 'WhatsApp' },
    { 'key': 'line', 'value': 'Line' },
    { 'key': 'wechat', 'value': 'Wechat' },
    { 'key': 'qq', 'value': 'QQ' },
  ])
}

// Common
export const useCopyText = () => {
  return useState('copyText', () => '')
}
export const useAlertError = () => {
  return useState('alertError', () => '')
}
export const useAlertInfo = () => {
  return useState('alertInfo', () => '')
}
export const usePostLoading = () => {
  return useState('postReqLoading', () => false)
}
export const useGetLoading = () => {
  return useState('getReqLoading', () => false)
}


// Merchant
export const useDataMerchantBasic = () => {
  return useState('DataMerchantBasic', () => { return {} })
}
export const useDataMerchantInfo = () => {
  return useState('DataMerchantInfo', () => { return {} })
}

export const stateMerchant = {
  async basic(server: boolean) {
    const { code, result } = await useReqGet('/api/merchant/basicInfo', { server }, server)
    if (server) {
      return code === 0 ? result : {}
    } else {
      if (code === 0) {
        useDataMerchantBasic().value = JSON.parse(JSON.stringify(result))
      }
    }
  },
  async info(server: boolean) {
    const { code, result } = await useReqGet('/api/merchant/info', { server }, server)
    if (server) {
      return code === 0 ? result : {}
    } else {
      if (code === 0) {
        useDataMerchantInfo().value = JSON.parse(JSON.stringify(result))
      }
    }
  },
}

// Order
export const useDataOrder = () => {
  return useState('DataOrder', () => { return {} })
}
export const useDataTxnOrders = () => {
  return useState('DataTxnOrders', () => { return {} })
}

export const stateOrder = {
  async refresh(id: string) {
    const { code, result } = await useReqGet('/api/order/info', { id })
    if (code === 0) {
      useDataOrder().value = result
    }
  },
  async add(projectId: string, skuId: string, orderInfo: any) {
    const { code, result } = await useReqPost('/api/order/add', { projectId, skuId, orderInfo })
    if (code === 0) {
      const orderId = result.orderId
      const localePath = useLocalePath()
      navigateTo(localePath(`/order/${orderId}`), {
        //external: true,
        //open: { target: "_blank" },  // safari浏览器会阻止弹窗
      })
    }
  },
  async pay(method: string, id: string, redirectUrl: string) {
    const { code, result } = await useReqPost('/api/order/pay', { method, id, redirect_url: redirectUrl })
    if (code === 0) {
      if (result) {
        const localePath = useLocalePath()
        const payUrl = result.payUrl.startsWith('/') ? localePath(result.payUrl) : result.payUrl
        navigateTo(payUrl, {
          external: true,
          //open: { target: "_blank" },
        })
      } else {
        location.reload()
      }
    }
  },
  async search(query: string) {
    const { code, result } = await useReqGet('/api/order/search', { query })
    if (code === 0) {
      useDataTxnOrders().value = result
    }
  },
}