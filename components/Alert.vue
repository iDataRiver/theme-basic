<script setup lang="ts">

const alertError = useAlertError()
const alertInfo = useAlertInfo()

watchEffect(() => {
  if (alertError.value !== '') {
    setTimeout(() => {
      alertError.value = '';
    }, 3000);
  }

  if (alertInfo.value !== '') {
    setTimeout(() => {
      alertInfo.value = '';
    }, 3000);
  }
})
</script>

<template>
  <section v-if="alertError" class="fixed top-4 z-50 left-1/2 -translate-x-1/2">
    <div id="alerterror" class="flex items-center p-4 mb-4 text-white rounded-lg bg-error" role="alert">
      <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        viewBox="0 0 20 20">
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">Error</span>
      <div class="ms-3 text-sm font-medium">
        {{ alertError }}
      </div>
    </div>
  </section>

  <section v-if="alertInfo" class="fixed top-4 z-50 left-1/2 -translate-x-1/2">
    <div id="alertInfo" class="flex items-center p-4 mb-4 text-white rounded-lg bg-blue-600" role="alert">
      <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        viewBox="0 0 20 20">
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">Info</span>
      <div class="ms-3 text-sm font-medium">
        {{ alertInfo }}
      </div>
    </div>
  </section>
</template>