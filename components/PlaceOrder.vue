<script setup>
const { locale } = useI18n()
const sku = useState('SelectedSKU')

const clear = () => {
  sku.value = {}
}
</script>

<template>
  <div v-if="isNotEmptyObj(sku)" id="placeorder" class="space-y-4">
    <button @click="clear()" class="mr-2 btn btn-xs btn-outline rounded-md">
      {{ $t('back_to_home') }}
    </button>

    <div class="text-lg font-bold text-gray-500">
      {{ $t('place_order') }}
    </div>

    <div class="flex grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
      <div class="max-md:order-last md:col-span-2 space-y-4 p-4 bg-white shadow-xl">

        <div class="space-y-2">
          <div class="text-sm text-gray-500">{{ nameI18n(locale, sku.project) }}</div>
          <div class="text-xl font-bold text-gray-800">{{ nameI18n(locale, sku) }}</div>
        </div>

        <div class="border-t"></div>

        <div class="space-y-2">
          <div class="text-md font-bold text-gray-500">{{ $t('sku_desc') }}</div>
          <div class="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
            {{ descI18n(locale, sku) }}
          </div>

          <div v-if="!sku.docLink" class="text-xs">
            <span class="text-xs text-gray-800 font-medium">{{ $t('more_see_doc') }}</span>
            👉 <a target="_blank" :href="sku.docLink" class="font-medium underline text-blue-500">[link]</a>
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-md font-bold text-gray-500">{{ $t('project_desc') }}</div>
          <div class="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
            {{ descI18n(locale, sku.project) }}
          </div>
        </div>
      </div>

      <div class="space-y-4 p-4 bg-white shadow-xl">
        <form @submit.prevent="stateOrder.add(sku.project.id, sku.id, sku.order)" action="">
          <div class="grid grid-cols-1 gap-y-2">

            <div v-if="!sku.pricing">
              <div class="text-sm font-medium text-gray-700">{{ $t('sku_pricing') }}
                <span class="ml-2 badge badge-error text-md text-white rounded-md">{{ $t('No_Pricing_Tip') }}</span>
              </div>
            </div>
            <div v-else-if="sku.pricing.policy === 'fixed'">
              <div class="text-sm font-medium text-gray-700">{{ $t('sku_pricing') }}
                <span class="ml-2 badge bg-blue-500 text-white text-md rounded-md">
                  <span class="font-bold">{{ sku.pricing.price }} USD</span>
                  <span class="text-xs">{{ $t('per_item') }}</span>
                </span>
              </div>
            </div>
            <div v-else-if="sku.pricing.policy === 'stage_quantity'">
              <div class="text-sm font-medium text-gray-700">{{ $t('sku_pricing') }}
                <span class="ml-2 badge bg-blue-500 text-white text-md rounded-md">{{ $t('Stage_Price') }}</span>
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th>{{ $t('Quantity') }}</th>
                    <th>{{ $t('Unit_Price') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(stage, stage_idx) in sku.pricing.stages" :key="sku.id + '-pricing-stage-' + stage.id">
                    <td class="text-xs">{{ stage.threshold }} &lt;= {{ $t('Quantity') }}<span
                        v-if="stage_idx + 1 < sku.pricing.stages.length">
                        &lt; {{ sku.pricing.stages[stage_idx + 1].threshold }}</span> </td>
                    <td class="text-xs font-bold">{{ stage.price }}
                      <span class="text-[10px]">
                        USD{{ $t('per_item') }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="space-x-2">
              <div class="badge badge-sm font-medium badge-outline rounded-md">
                {{ $t('stock') }} {{ displayStock(sku.stock, sku.hiddenStock) }}
              </div>
              <div v-if="sku.itemType === 'reuse'" class="badge badge-sm font-medium badge-outline rounded-md">
                {{ $t('at_most_buy_one') }}
              </div>
              <div class="badge badge-sm font-medium badge-outline rounded-md">
                {{ $t('automatic_delivery') }}
              </div>
            </div>

            <div class="space-y-2 mt-8">
              <label :for="'quantity-input-' + sku.id" class="flex text-sm font-medium text-gray-700">
                {{ $t('Quantity') }}
              </label>
              <div class="flex items-center w-full">
                <input v-model="sku.order.quantity" type="number" :id="'quantity-input-' + sku.id" data-input-counter
                  :data-input-counter-min="1" :data-input-counter-max="sku.order.maxQuantity"
                  class="w-full px-3 py-1 text-sm border rounded-sm border-gray-300 text-gray-800 focus:ring-gray-900 focus:border-0"
                  required />
              </div>
            </div>

            <div class="space-y-2">
              <label class="flex text-sm font-medium text-gray-700">{{ $t('Contact_Information') }}</label>
              <input v-model="sku.order.contactInfo" type="text" minlength="5"
                :placeholder="$t('order_contact_info_placeholder')"
                class="w-full px-3 py-1 text-sm border rounded-sm border-gray-300 text-gray-800 focus:ring-gray-900 focus:border-0"
                required>
            </div>

            <div v-if="sku.project.hasCoupons" class="space-y-2">
              <label class="flex text-sm font-medium text-gray-700">{{ $t('Coupon') }}</label>
              <input v-model="sku.order.coupon" type="text" maxlength="50"
                class="w-full px-3 py-1 text-sm border rounded-sm border-gray-300 text-gray-800 focus:ring-gray-900 focus:border-0">
            </div>

            <div class="mt-4">
              <button v-if="sku.stock === 0" type="submit" disabled
                class="w-full px-5 py-2.5 text-sm font-medium rounded-md bg-gray-300 text-white cursor-not-allowed">
                {{ $t('place_order') }}
              </button>
              <BtnSubmit v-else :content="$t('place_order')" :btnSize="'medium'" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>