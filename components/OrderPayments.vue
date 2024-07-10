<script setup>
const props = defineProps(['order'])
const order = props.order
const translate = useNuxtApp().$i18n.t
const paymentName = (name) => {
  if (['credits', 'crypto', 'alipay', 'wxpay', 'hiicash'].includes(name)) {
    return translate('platform_payment_' + name)
  }
  return name
}

const { locale } = useI18n()

const composeOrderUrl = (method, id) => {
  const path = '/api/order/pay'
  const redirectUrl = encodeURIComponent(`${getBaseUrl()}${useRoute().fullPath}`)
  const url = `${path}?method=${method}&id=${id}&redirectUrl=${redirectUrl}&locale=${locale.value}`
  return `${url}&_sign=${encryptReq(path)}`
}
</script>

<template>
  <div>
    <div v-if="order.isConsumer" class="flex flex-wrap gap-x-4 gap-y-2">
      <template v-for="payment in order.mPayments">
        <div v-if="payment.enabled && payment.method !== 'credits'">
          <a target="_blank" :href="composeOrderUrl(payment.method, order.id)"
            class="w-full font-bold rounded-md text-white px-3 py-1.5 text-sm cursor-pointer"
            :class="[payment.isPlatform ? 'bg-yellow-300 hover:bg-yellow-400' : 'bg-green-400 hover:bg-green-500']">
            {{ paymentName(payment.name) }}
          </a>
        </div>
      </template>
    </div>
    <button v-else type="submit" disabled
      class="w-full px-3 py-1.5 text-sm font-medium rounded-md bg-gray-300 text-white cursor-not-allowed">
      {{ $t('charge_btn') }}
    </button>
  </div>
</template>