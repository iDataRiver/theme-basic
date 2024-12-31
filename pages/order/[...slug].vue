<script setup>
const order = useDataOrder()

onMounted(() => {
  order.value = {}
  const orderId = useRoute().path.split('/').pop()
  stateOrder.refresh(orderId)
});
</script>

<template>
  <NuxtLayout name="simplified">
    <section class="flex justify-center">
      <div v-if="isNotEmptyObj(order)" class="w-full max-w-screen-lg">
        <OrderDetailDigital />
      </div>
      <div v-else class="flex items-center justify-center pt-40">
        <span class="loading loading-infinity loading-lg mt-40"></span>
      </div>
    </section>
  </NuxtLayout>
</template>