<script setup>
const props = defineProps(['order'])
const order = props.order
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
            class="flex font-bold rounded-md px-3 py-1.5 text-sm cursor-pointer bg-gray-200 hover:bg-gray-300">
            <div class="text-left">
              <div class="font-bold text-sm cursor-pointer"
                :class="[payment.isPlatform ? 'text-blue-600' : 'text-green-600']">
                {{ paymentName(payment.name) }}
                <span class="text-[11px] font-medium text-gray-800">{{ payment.desc }}</span>
              </div>
              <p v-if="payment.isPlatform" class="text-[11px] text-gray-800">
                <span v-if="payment.paymentFeeCovered">
                  + {{ $t('Payment_fee') }}: 0%
                </span>
                <span v-else>
                  + {{ $t('Payment_fee') }}: {{ payment.ratioRange }}
                  <span v-if="payment.fixedFeeRange">+{{ payment.fixedFeeRange }}</span>
                </span>
              </p>
              <p v-else class="text-[11px] text-gray-800">
                + {{ $t('Payment_fee') }}: 0%
              </p>
            </div>
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