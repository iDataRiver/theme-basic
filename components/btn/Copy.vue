<script setup>
const props = defineProps(['copyStatus', 'text', 'btnSize'])
const text = props.copyStatus ? useState(props.copyStatus, () => '') : props.text || ''
const btnSize = props.btnSize || 'large'

const copied = ref(false)
const clickCopyBtn = () => {
  navigator.clipboard.writeText(isRef(text) ? text.value : text)

  if (copied.value) return
  copied.value = true
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>


<template>
  <div>
    <div class="relative">
      <button @click.stop="clickCopyBtn"
        class="text-gray-900 hover:bg-gray-100 rounded-md inline-flex items-center justify-center bg-white border-gray-200 border"
        :class="{ 'py-2 px-2.5 text-md': btnSize == 'large', 'py-1.5 px-1.5 text-sm': btnSize == 'medium', 'px-1 py-1 text-xs': btnSize == 'small' }">
        <span id="default-message" class="inline-flex items-center" :class="[copied ? 'hidden' : '']">
          <svg class="w-3 h-3 me-1.5" :aria-hidden="copied" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 18 20">
            <path
              d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
          </svg>
          <span class="text-xs font-semibold">Copy</span>
        </span>
        <span id="success-message" class="inline-flex items-center" :class="[copied ? '' : 'hidden']">
          <svg class="w-3 h-3 text-gray-800 me-1.5" :aria-hidden="!copied" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 16 12">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 5.917 5.724 10.5 15 1.5" />
          </svg>
          <span class="text-xs font-semibold text-gray-800">Copied</span>
        </span>
      </button>
    </div>
  </div>
</template>