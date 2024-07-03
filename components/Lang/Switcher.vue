<script setup>
import LangEn from './En.vue';
import LangEs from './Es.vue';
import LangDe from './De.vue';
import LangFr from './Fr.vue';
import LangJa from './Ja.vue';
import LangZhCN from './ZhCN.vue';
import LangZhHK from './ZhHK.vue';
import LangKo from './Ko.vue';
import LangTr from './Tr.vue';
import LangRu from './Ru.vue';
import LangUk from './Uk.vue';
import LangUz from './Uz.vue';
import LangKk from './Kk.vue';
import LangPl from './Pl.vue';
import LangAr from './Ar.vue';
import LangPt from './Pt.vue';
import LangFa from './Fa.vue';
import LangPa from './Pa.vue';

const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const availableLocales = computed(() => {
  return [
    { code: 'en', component: LangEn, selected: 'en' === locale.value },
    { code: 'es', component: LangEs, selected: 'es' === locale.value },
    { code: 'de', component: LangDe, selected: 'de' === locale.value },
    { code: 'fr', component: LangFr, selected: 'fr' === locale.value },
    { code: 'ja', component: LangJa, selected: 'ja' === locale.value },
    { code: 'zh-cn', component: LangZhCN, selected: 'zh-cn' === locale.value },
    { code: 'zh-hk', component: LangZhHK, selected: 'zh-hk' === locale.value },
    { code: 'ko', component: LangKo, selected: 'ko' === locale.value },
    { code: 'tr', component: LangTr, selected: 'tr' === locale.value },
    { code: 'ru', component: LangRu, selected: 'ru' === locale.value },
    { code: 'uk', component: LangUk, selected: 'uk' === locale.value },
    { code: 'uz', component: LangUz, selected: 'uz' === locale.value },
    { code: 'kk', component: LangKk, selected: 'kk' === locale.value },
    { code: 'pl', component: LangPl, selected: 'pl' === locale.value },
    { code: 'ar', component: LangAr, selected: 'ar' === locale.value },
    { code: 'pt', component: LangPt, selected: 'pt' === locale.value },
    { code: 'fa', component: LangFa, selected: 'fa' === locale.value },
    { code: 'pa', component: LangPa, selected: 'pa' === locale.value },
  ]
})
const selectedLocales = computed(() => {
  return availableLocales.value.filter(i => i.selected)[0]
})
</script>

<template>
  <div class="">
    <button type="button" data-dropdown-toggle="language-dropdown-menu"
      class="inline-flex w-full items-center font-medium justify-center px-2 py-1 text-gray-900 rounded-md cursor-pointer hover:bg-gray-100">
      <component :is="selectedLocales.component"></component>
    </button>
    <!-- Dropdown -->
    <div class="z-10 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-md shadow"
      id="language-dropdown-menu">
      <ul class="h-80 overflow-y-auto py-2 font-medium" role="none">
        <li v-for="itemLocale in availableLocales" :key="'lang-' + itemLocale.code">
          <NuxtLink @click.prevent.stop="setLocale(itemLocale.code)" :to="localePath(route.fullPath, itemLocale.code)"
            class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
            <div class="flex items-center w-24" :class="{ 'cursor-not-allowed': itemLocale.selected }">
              <div class="w-full">
                <component :is="itemLocale.component"></component>
              </div>
              <div v-if="itemLocale.selected">
                <svg class="w-3 h-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 16 12">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 5.917 5.724 10.5 15 1.5" />
                </svg>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>