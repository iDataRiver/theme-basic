<script setup>
import { nameI18n } from '~/utils/i18n';

const { locale } = useI18n()
const localePath = useLocalePath()
const basicInfo = await stateMerchant.basic(true)
const scripts = basicInfo.website.script
</script>

<template>
  <NuxtLayout name="default">
    <div class="fixed top-0 z-20 w-full flex items-center justify-center bg-white">
      <div class="w-full max-w-screen-xl bg-white px-1">
        <div class="flex items-center h-16">
          <div class="flex items-center justify-center bg-white gap-x-0.5">
            <svg class="w-7 h-7 text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 12c.263 0 .524-.06.767-.175a2 2 0 0 0 .65-.491c.186-.21.333-.46.433-.734.1-.274.15-.568.15-.864a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 12 9.736a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 16 9.736c0 .295.052.588.152.861s.248.521.434.73a2 2 0 0 0 .649.488 1.809 1.809 0 0 0 1.53 0 2.03 2.03 0 0 0 .65-.488c.185-.209.332-.457.433-.73.1-.273.152-.566.152-.861 0-.974-1.108-3.85-1.618-5.121A.983.983 0 0 0 17.466 4H6.456a.986.986 0 0 0-.93.645C5.045 5.962 4 8.905 4 9.736c.023.59.241 1.148.611 1.567.37.418.865.667 1.389.697Zm0 0c.328 0 .651-.091.94-.266A2.1 2.1 0 0 0 7.66 11h.681a2.1 2.1 0 0 0 .718.734c.29.175.613.266.942.266.328 0 .651-.091.94-.266.29-.174.537-.427.719-.734h.681a2.1 2.1 0 0 0 .719.734c.289.175.612.266.94.266.329 0 .652-.091.942-.266.29-.174.536-.427.718-.734h.681c.183.307.43.56.719.734.29.174.613.266.941.266a1.819 1.819 0 0 0 1.06-.351M6 12a1.766 1.766 0 0 1-1.163-.476M5 12v7a1 1 0 0 0 1 1h2v-5h3v5h7a1 1 0 0 0 1-1v-7m-5 3v2h2v-2h-2Z" />
            </svg>
            <NuxtLink :to="localePath('/')" class="merchant-name text-lg font-medium">
              {{ nameI18n(locale, basicInfo) }}
            </NuxtLink>
          </div>
          <div class="flex-grow" />
          <div class="flex items-center space-x-0.5">
            <NuxtLink :to="localePath('/order/search')" class="btn btn-sm btn-outline rounded-md">
              {{ $t('header_search_order') }}
            </NuxtLink>
            <LangSwitcher />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-16 w-full flex items-center justify-center bg-gray-50">
      <div class="grid grid-cols-1 w-full">
        <div class="flex items-center justify-start h-full gap-x-4">
          <div class="flex h-screen overflow-y-auto border-t1">
            <div class="h-screen w-screen border-t1">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />

    <template v-if="scripts">
      <div v-html="scripts"></div>
    </template>
  </NuxtLayout>
</template>

<style>
.merchant-name {
  display: -webkit-box;
  /* 将元素作为弹性伸缩盒子展示 */
  -webkit-line-clamp: 1;
  /* 限制文本行数为 1 行 */
  -webkit-box-orient: vertical;
  /* 设置伸缩盒子为垂直方向 */
  overflow: hidden;
  /* 隐藏溢出文本 */
  text-overflow: ellipsis;
  /* 使用省略号截断溢出文本 */
}
</style>