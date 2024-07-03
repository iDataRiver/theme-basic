<script setup>
const props = defineProps(['priceDesc'])
const priceDesc = props.priceDesc
</script>

<template>
  <div v-if="priceDesc.policy == 'fixed'">
    <div v-if="priceDesc.price == '$0'">
      <span class="text-3xl font-bold text-blue-600">{{ $t(('free_price_tag')) }}</span>
    </div>
    <div v-else>
      <span class="text-3xl font-bold text-blue-600">{{ priceDesc.price }}</span>
      <span class="text-xs text-gray-500">{{ $t('per_item') }}</span>
    </div>
  </div>
  <div v-else-if="priceDesc.policy == 'stage_quantity'">
    <span class="text-xs text-gray-500">{{ $t('low_to') }}</span>
    <span class="text-3xl font-bold text-blue-600">{{ priceDesc.minPrice }}</span>
  </div>
</template>