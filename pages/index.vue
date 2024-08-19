<script setup>
const { locale } = useI18n()
const merchantInfo = await stateMerchant.info(true)

const seoInit = (infoObj) => {
  const info = isRef(infoObj) ? infoObj.value : infoObj
  if (isNotEmptyObj(info)) {
    const url = useRequestURL().href
    const title = nameI18n(locale, info)
    let description = descI18n(locale, info).replace(/[\r\n]/g, ' ')
    const logo = info.logo || 'https://docs.idatariver.com/logo.png'

    let itemListElement = []
    info.projects.forEach(project => {
      description += '|' + nameI18n(locale, project)

      if (!project.skus) { return }
      project.skus.forEach(sku => {
        itemListElement.push({
          "@type": "ListItem",
          "position": itemListElement.length + 1,
          "item": {
            "@id": `${url}#${sku.id}`,
            "name": nameI18n(locale, sku)
          }
        })
      })
    })

    useHead({
      title: title,
      meta: [
        { 'name': 'description', 'content': description },
        { 'itemprop': 'name', 'content': title },
        { 'itemprop': 'description', 'content': description },
        { 'itemprop': 'url', 'content': url },
        { 'itemprop': 'image', 'content': logo },
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": itemListElement
          })
        }
      ],
    })

    useSeoMeta({
      ogType: 'website',
      ogSiteName: title,
      ogTitle: title,
      ogUrl: url,
      ogImage: logo,
      ogDescription: description,
    })
  }
}

seoInit(merchantInfo)
</script>


<template>
  <NuxtLayout name="simplified" :merchant="merchantInfo">
    <HomeTheme1 :merchant="merchantInfo" />
  </NuxtLayout>
</template>