<script setup>
const props = defineProps(['content', 'btnSize'])
const btnSize = props.btnSize || 'large'
const postLoading = usePostLoading()

const isClicked = ref(false)
const setIsClicked = () => {
  isClicked.value = true
}

watchEffect(() => {
  if (postLoading.value === false) {
    isClicked.value = false;
  }
})
</script>

<template>
  <button v-if="postLoading && isClicked" type="submit" disabled
    class="w-full font-bold rounded-md bg-gray-300 text-white cursor-not-allowed"
    :class="{ 'px-8 py-3 text-md': btnSize == 'large', 'px-5 py-2.5 text-sm': btnSize == 'medium', 'px-2 py-1 text-xs': btnSize == 'small' }">
    {{ content }}...
  </button>
  <button v-else type="submit" @click="setIsClicked()"
    class="w-full font-bold rounded-md bg-gray-900 text-white hover:bg-gray-800"
    :class="{ 'px-8 py-3 text-md': btnSize == 'large', 'px-5 py-2.5 text-sm': btnSize == 'medium', 'px-2 py-1 text-xs': btnSize == 'small' }">
    {{ content }}
  </button>
</template>