<script setup>
const props = defineProps(['intro'])
const intro = props.intro

onMounted(() => {
  if (intro) {
    merchantNotice.showModal()
  }
});
</script>

<template>
  <button onclick="merchantNotice.showModal()" class="btn bg-blue-700 hover:bg-blue-600 btn-sm rounded-md">
    <span class="text-white font-bold">{{ $t('Notice') }}</span>
  </button>
  <dialog ref="merchantNotice" id="merchantNotice" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ $t('Notice') }}</h3>
      <p class="py-4 whitespace-pre-wrap leading-relaxed">{{ intro }}</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>