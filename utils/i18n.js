export const nameI18n = (locale, obj) => {
  if (isRef(locale)) {
    locale = locale.value
  }
  const i18nOpened = obj.i18nType === 0 || !obj.i18nType
  if (obj.nameI18n && i18nOpened && obj.nameI18n[locale]) {
    return obj.nameI18n[locale]
  }
  return obj.name
}


export const descI18n = (locale, obj) => {
  if (isRef(locale)) {
    locale = locale.value
  }
  const i18nOpened = obj.i18nType === 0 || !obj.i18nType
  if (obj.descI18n && i18nOpened && obj.descI18n[locale]) {
    return obj.descI18n[locale]
  }
  return obj.desc
}