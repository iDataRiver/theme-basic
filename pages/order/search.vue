<script setup>
const localePath = useLocalePath()
const dataTxnOrders = useDataTxnOrders()
const query = ref('')
const pageLoading = useGetLoading()  // default page is loading when Get Request is loading 
</script>

<template>
  <NuxtLayout name="simplified">
    <section class="max-w-4xl mx-auto">
      <div class="mt-8 space-y-4 px-2">
        <form @submit.prevent="stateOrder.search(query)" class="max-w-2xl mx-auto">
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input v-model="query" type="search" maxlength="100"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-0 focus:ring-gray-500 focus:border-gray-500"
              :placeholder="$t('search_order_input_placeholder')" required />
            <button type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-gray-900 hover:bg-gray-800 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2">
              {{ $t('Search_Order') }}
            </button>
          </div>
          <p class="mt-4 text-xs flex1 justify-center text-gray-500">* {{ $t('search_order_tip1') }}</p>
        </form>


        <div v-if="pageLoading" class="flex items-center justify-center">
          <span class="loading loading-infinity loading-lg mt-20"></span>
        </div>
        <div v-else-if="isNotEmptyObj(dataTxnOrders)" class="mt-6 overflow-x-auto w-full">
          <table v-if="dataTxnOrders.items.length !== 0" class="table w-full text-sm text-left">
            <thead class="text-sm text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 font-bold">
                  {{ $t('txn_order_id') }}
                </th>
                <th scope="col" class="px-6 py-3 font-bold">
                  {{ $t('Name') }}
                </th>
                <th scope="col" class="px-6 py-3 font-bold">
                  {{ $t('Quantity') }}
                </th>
                <th scope="col" class="px-6 py-3 font-bold">
                  {{ $t('Price') }}
                </th>
                <th scope="col" class="px-6 py-3 font-bold">
                  {{ $t('Status') }}
                </th>
                <th scope="col" class="px-6 py-3 font-bold">
                  {{ $t('Date') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in dataTxnOrders.items" :key="'txn-order-' + item.id"
                class="bg-white border-b text-gray-900">
                <th scope="row" class="px-6 py-4 whitespace-nowrap">
                  <NuxtLink :to="localePath(`/order/${item.id}`)" target="_blank" class="underline">
                    {{ item.id }}
                  </NuxtLink>
                </th>
                <td class="px-6 py-4">
                  {{ item.skuName }}
                </td>
                <td class="px-6 py-4">
                  {{ item.quantity }}
                </td>
                <td class="px-6 py-4">
                  {{ item.price }} {{ $t('credits') }}
                </td>
                <td class="px-6 py-4">
                  {{ $t('txn_order_status_' + item.status) }}
                </td>
                <td class="px-6 py-4">
                  {{ formatLocaleDate(item.date) }}
                </td>
              </tr>
            </tbody>
          </table>
          <EmptyContent v-else>{{ $t('tansation_not_found') }}</EmptyContent>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>