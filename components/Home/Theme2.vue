<script setup>
const { locale } = useI18n()
const translate = useNuxtApp().$i18n.t

const selectedCate = ref({ name: translate('All'), code: 'all' })
const cates = ref([{ name: translate('All'), code: 'all' }])
const selectedSKU = useState('SelectedSKU', () => { return {} })
const props = defineProps(['merchant'])
const merchant = useDataMerchantInfo()
merchant.value = props.merchant
const siteSettings = merchant.value.website ? merchant.value.website.settings : {}
const projects = merchant.value.projects

projects.forEach((project) => {
  if (!['DIGITAL', 'MANUAL', 'LICENSE', 'GROUP'].includes(project.type)) {
    return
  }
  cates.value.push({
    'name': nameI18n(locale, project),
    'code': project.slug,
  })

  project.skus.forEach((sku) => {
    sku.projectSlug = project.slug
    sku.cover = project.cover
    sku.project = {
      id: project.id,
      type: project.type,
      name: project.name,
      nameI18n: project.nameI18n,
      desc: project.desc,
      descI18n: project.descI18n,
      hasCoupons: project.hasCoupons,
    }
    sku.order.affCode = project.aff
  })
})

watch(merchant, () => {
  const merchantInfo = merchant.value
  if (!isNotEmptyObj(merchantInfo)) { return }
})

const changeCate = (code) => {
  cates.value.forEach((cate) => {
    if (cate.code == code) {
      selectedCate.value = cate
    }
  })
}

const selectSKU = (sku) => {
  selectedSKU.value = sku
}

onMounted(() => {
  stateMerchant.info(false);
});
</script>


<template>
  <section class="flex justify-center">
    <div v-if="isNotEmptyObj(merchant)" class="w-full max-w-screen-lg space-y-4 px-4 my-2">

      <div class="mt-4 flex items-center">
        <div>
          <BtnMerchantIntro :intro="descI18n(locale, merchant)" />
        </div>

        <div class="flex-grow" />

        <div class="flex items-center gap-x-2">
          <BtnMerchantContact :contacts="merchant.contacts" :vertical="true" />
        </div>
      </div>

      <ClientOnly v-if="!isNotEmptyObj(selectedSKU)">
        <Carousel :siteSettings="siteSettings" />
      </ClientOnly>

      <div v-if="!isNotEmptyObj(selectedSKU)" id="projects" class="space-y-4">
        <div class="space-y-2">
          <button v-for="cate in cates" @click="changeCate(cate.code)" class="mr-2 btn btn-xs btn-outline rounded-md"
            :class="{ 'btn-active': selectedCate.code == cate.code }">
            {{ cate.name }}
          </button>
        </div>

        <!--projects-->
        <div class="space-y-4">
          <template v-for="project in projects">
            <template
              v-if="['DIGITAL', 'MANUAL', 'LICENSE', 'GROUP'].includes(project.type) && project.skus.length > 0 && ['all', project.slug].includes(selectedCate.code)">

              <details
                class="group [&_summary::-webkit-details-marker]:hidden rounded-lg border1 border-gray-900 bg-gradient-to-b bg-white"
                open>
                <summary class="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-gray-900">
                  <div class="flex items-center gap-x-2">
                    <figure>
                      <NuxtImg loading="lazy" format="webp" :src="project.cover" :alt="nameI18n(locale, project)"
                        class="h-[40px] w-[40px] object-cover rounded-xl" />
                    </figure>
                    <h2 class="font-medium">{{ nameI18n(locale, project) }}</h2>
                  </div>

                  <svg class="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div class="mx-4 pb-4 leading-relaxed text-gray-700">
                  <EmptyContent v-if="project.skus.length === 0" class="pb-20">{{ $t('No_Skus') }}</EmptyContent>
                  <div v-else class="overflow-x-auto rounded-lg border border-gray-400">
                    <table class="table">
                      <!-- head -->
                      <thead>
                        <tr class="border-b border-gray-400">
                          <th class="w-1/2">{{ $t('product_name') }}</th>
                          <th>{{ $t('Price') }}</th>
                          <th>{{ $t('stock') }}</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="sku in project.skus" class="border-gray-400">
                          <td>{{ nameI18n(locale, sku) }}</td>
                          <td>
                            <PriceTag :key="'price-tag-' + sku.id" :price-desc="sku.priceDesc"
                              price-class="text-md sm:text-lg font-bold text-blue-600"
                              class="flex items-center gap-x-1" />
                          </td>
                          <td>{{ displayStock(sku.stock, sku.hiddenStock) }}</td>
                          <td class="border-gray-500" @click="sku.stock != 0 && selectSKU(sku)">
                            <svg class="w-6 h-6 hover:cursor-pointer"
                              :class="[sku.stock == 0 ? 'text-gray-400' : 'text-blue-600']" aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                            </svg>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </details>
            </template>
          </template>
        </div>
        <EmptyContent v-if="projects.length === 0" class="pt-40">{{ $t('No_Skus') }}</EmptyContent>
      </div>
      <div v-else>
        <PlaceOrder />
      </div>

    </div>
    <div v-else class="flex items-center justify-center pt-40">
      <span class="loading loading-infinity loading-lg mt-40"></span>
    </div>
  </section>
</template>



<style>
.project-name {
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

.sku-name {
  display: -webkit-box;
  /* 将元素作为弹性伸缩盒子展示 */
  -webkit-line-clamp: 2;
  /* 限制文本行数为 2 行 */
  -webkit-box-orient: vertical;
  /* 设置伸缩盒子为垂直方向 */
  overflow: hidden;
  /* 隐藏溢出文本 */
  text-overflow: ellipsis;
  /* 使用省略号截断溢出文本 */
}
</style>