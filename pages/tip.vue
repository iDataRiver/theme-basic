<script setup>
const msgI18n = useRoute().query.i18n || 'No_Data'
const code = useRoute().query.code || '0'
</script>

<template>
  <NuxtLayout name="simplified">
    <div class="flex items-center justify-center pt-40">
      <p class="font-semibold flex justify-cente text-xl sm:text-3xl"
        :class="[code == '10' ? 'text-blue-600' : 'text-red-500']">
        {{ $t(msgI18n) }}
      </p>
    </div>
  </NuxtLayout>
</template>