export const isNotEmptyObj = (obj: any) => {
  return Object.keys(obj).length !== 0;
}

export const displayStock = (stock: number, hidden: boolean) => {
  if (!hidden) { return stock }
  if (stock == 0) {
    return '0'
  }
  return '>=1'
}

export const paymentName = (name: string) => {
  if (name == 'card') {
    return 'Visa / Mastercard'
  }
  if (['credits', 'crypto', 'alipay', 'wxpay', 'hiicash'].includes(name)) {
    const translate = useNuxtApp().$i18n.t
    return translate('platform_payment_' + name)
  }
  return name
}