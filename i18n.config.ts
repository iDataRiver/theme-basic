import en from './i18n/en';
import zhcn from './i18n/zh-CN';

import zhhk from './i18n/auto/zh-HK';
import ja from './i18n/auto/ja';
import es from './i18n/auto/es';
import de from './i18n/auto/de';
import fr from './i18n/auto/fr';
import ko from './i18n/auto/ko';
import tr from './i18n/auto/tr';
import ru from './i18n/auto/ru';
import uk from './i18n/auto/uk';
import uz from './i18n/auto/uz';
import kk from './i18n/auto/kk';
import pl from './i18n/auto/pl';
import ar from './i18n/auto/ar';
import pt from './i18n/auto/pt';
import fa from './i18n/auto/fa';
import pa from './i18n/auto/pa';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    de,
    fr,
    ja,
    'zh-cn': zhcn,
    'zh-hk': zhhk,
    ko,
    tr,
    ru,
    uk,
    uz,
    kk,
    pl,
    ar,
    pt,
    fa,
    pa,
  },
}))
