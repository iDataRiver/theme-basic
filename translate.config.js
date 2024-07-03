// https://github.com/hymhub/language-translate
import { Lang } from 'language-translate/types';
import { defineConfig } from 'language-translate/utils';

const configEn = {
  fromLang: Lang.en,
  fromPath: 'i18n/en.ts',
  translate: [
    {
      label: '将结果翻译到i18n/auto文件夹下',
      targetConfig: [
        {
          targetLang: Lang.ar,
          outPath: 'i18n/auto/ar.ts',
        },
        {
          targetLang: Lang.de,
          outPath: 'i18n/auto/de.ts',
        },
        {
          targetLang: Lang.es,
          outPath: 'i18n/auto/es.ts',
        },
        {
          targetLang: Lang.fa,
          outPath: 'i18n/auto/fa.ts',
        },
        {
          targetLang: Lang.fr,
          outPath: 'i18n/auto/fr.ts',
        },
        {
          targetLang: Lang.kk,
          outPath: 'i18n/auto/kk.ts',
        },
        {
          targetLang: Lang.ja,
          outPath: 'i18n/auto/ja.ts',
        },
        {
          targetLang: Lang.ko,
          outPath: 'i18n/auto/ko.ts',
        },
        {
          targetLang: Lang.pa,
          outPath: 'i18n/auto/pa.ts',
        },
        {
          targetLang: Lang.pl,
          outPath: 'i18n/auto/pl.ts',
        },
        {
          targetLang: Lang.pt,
          outPath: 'i18n/auto/pt.ts',
        },
        {
          targetLang: Lang.ru,
          outPath: 'i18n/auto/ru.ts',
        },
        {
          targetLang: Lang.tr,
          outPath: 'i18n/auto/tr.ts',
        },
        {
          targetLang: Lang.uk,
          outPath: 'i18n/auto/uk.ts',
        },
        {
          targetLang: Lang.uz,
          outPath: 'i18n/auto/uz.ts',
        },
      ]
    },
  ]
}

const configZh = {
  fromLang: Lang['zh-CN'],
  fromPath: 'i18n/zh-CN.ts',

  translate: [
    {
      label: '将结果翻译到i18n/auto文件夹下',
      targetConfig: [
        {
          targetLang: Lang['zh-TW'],  // zh-HK会翻译成英文
          outPath: 'i18n/auto/zh-HK.ts',
        }
      ]
    },
  ]
}
//export default defineConfig(configEn)
export default defineConfig(configZh)