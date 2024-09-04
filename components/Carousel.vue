<script setup>
const props = defineProps(['siteConfig'])
const siteConfig = props.siteConfig
</script>

<template>
  <div v-if="siteConfig.carousel && siteConfig.carousel.items" id="default-carousel" class="relative w-full"
    :data-carousel="siteConfig.carousel.status">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-lg md:h-80">
      <template v-for="item in siteConfig.carousel.items">
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <a :href="item.url" target="_blank" class="h-56 md:h-80 cursor-pointer">
            <figure>
              <NuxtImg loading="lazy" format="webp" :src="item.cover" :alt="item.title"
                class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover brightness-75" />
            </figure>
            <div
              class="absolute top-4 md:top-6 lg:top-8 left-4 md:left-8 lg:left-16 py-5 text-left text-white space-y-4">
              <div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium"
                :class="[item.titleClass ? item.titleClass : '']">
                {{ item.title }}
              </div>
              <div class="w-2/3" :class="[item.titleClass ? item.descClass : '']">
                {{ item.desc }}
              </div>
            </div>
          </a>
        </div>
      </template>
    </div>
    <!-- Slider indicators -->
    <div v-if="siteConfig.carousel.items.length > 1"
      class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
      <template v-for="(item, index) in siteConfig.carousel.items">
        <button type="button" class="w-3 h-3 rounded-full" :aria-current="index === 0" :aria-label="item.title"
          :data-carousel-slide-to="index"></button>
      </template>
    </div>
  </div>
</template>