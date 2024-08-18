// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    idatariverMerchantSecret: '',
    public: {
      idatariver: 'https://www.idatariver.com',
      idatariverServer: 'https://open.idatariver.com',
      apiEncryptKey: 'Powered By iDataRiver.com',
    }
  },
  components: [
    {
      path: '~/components',
    },
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/image',
  ],
  css: ['~/assets/css/main.css'],
  nitro: { // 性能优化
    compressPublicAssets: true,
  },
  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default 
    locales: [
      { code: 'en', iso: 'en' },
      { code: 'es', iso: 'es' },  // 西班牙语
      { code: 'de', iso: 'de' },  // 德语
      { code: 'fr', iso: 'fr' },  // 法语
      { code: 'ja', iso: 'ja' },  // 日语
      { code: 'zh-cn', iso: 'zh-cn' },  // 简体中文
      { code: 'zh-hk', iso: 'zh-hk' },  // 繁体中文
      { code: 'ko', iso: 'ko' },  // 韩语
      { code: 'tr', iso: 'tr' },  // 土耳其
      { code: 'ru', iso: 'ru' },  // 俄语
      { code: 'uk', iso: 'uk' },  // 乌克兰
      { code: 'uz', iso: 'uz' },  // 乌兹别克语
      { code: 'kk', iso: 'kk' },  // 哈萨克语
      { code: 'pl', iso: 'pl' },  // 波兰语
      { code: 'ar', iso: 'ar' },  // 阿拉伯语
      { code: 'pt', iso: 'pt' },  // 葡萄牙语
      { code: 'fa', iso: 'fa' },  // 波斯语
      { code: 'pa', iso: 'pa' },  // 旁遮普语
    ],  // used in URL path prefix
    defaultLocale: 'en',    // default locale of your project for Nuxt pages and routings
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      //redirectOn: 'all',
      alwaysRedirect: true,
    }
  },
  robots: {
    configPath: './robots.config.ts',
  },
  site: {
    autoLastmod: true,
  },
})
