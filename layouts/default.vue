<script setup>
// https://i18n.nuxtjs.org/guide/seo
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})

useHead({
  meta: [
    { 'name': 'revisit-after', 'content': '1 days' },
  ],
})

useSeoMeta({
  robots: 'index, follow',
})
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">

    <Head>
      <template v-for="link in head.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>

    <Body>
      <slot />
      <Alert />
    </Body>

    </Html>
  </div>
</template>