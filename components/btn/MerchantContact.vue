<script setup>
const props = defineProps(['contacts', 'vertical'])
const contacts = props.contacts
const vertical = props.vertical || false
const contactTypes = useContactTypes()
</script>

<template>
  <button onclick="merchantContacts.showModal()" class="btn bg-orange-500 hover:bg-orange-400 btn-sm rounded-md">
    <span class="text-white font-bold">{{ $t('Contact_Merchant') }}</span>
  </button>
  <dialog id="merchantContacts" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ $t('Contact_Merchant') }}</h3>

      <div>
        <p v-if="!isNotEmptyObj(contacts)" class="text-xs text-gray-500">
          {{ $t('no_provider_contact_info') }}
        </p>
        <div v-else class="py-4 flex flex-wrap gap-y-1 gap-x-4" :class="{ 'grid grid-col-1': vertical }">
          <template v-for="contactType in contactTypes">
            <p v-if="contacts[contactType.key]" class="text-sm my-1">
              <span class="badge badge-ghost border-0 font-medium mr-1">
                {{ contactType.value }}
              </span>
              {{ contacts[contactType.key] }}
            </p>
          </template>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
