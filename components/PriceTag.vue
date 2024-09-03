<script setup>
const props = defineProps(['priceDesc', 'priceClass'])
const priceDesc = props.priceDesc
const priceClass = props.priceClass ? props.priceClass : 'text-3xl font-bold text-blue-600'
</script>

<template>
  <div v-if="priceDesc.policy == 'fixed'">
    <div v-if="priceDesc.price == '$0'">
      <span :class="[priceClass]">{{ $t(('free_price_tag')) }}</span>
    </div>
    <div v-else>
      <span :class="[priceClass]">{{ priceDesc.price }}</span>
      <span class="text-xs text-gray-500">{{ $t('per_item') }}</span>
    </div>
  </div>
  <div v-else-if="priceDesc.policy == 'stage_quantity'">
    <span class="text-xs text-gray-500">{{ $t('low_to') }}</span>
    <span :class="[priceClass]">{{ priceDesc.minPrice }}</span>
  </div>
</template>