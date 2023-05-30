import { currentLanguage } from '@jusda-tools/jusda-publicMethod';
import localesEn from '@/locales/en-US';
import localeZh from '@/locales/zh-CN';
const setLg = new Map().set('en-US', localesEn).set('zh-CN', localeZh);
// 国际化language
let language = currentLanguage();
if (language === 'zh-CN') {
    language = 'zh-CN';
} else if (language === 'en-US') {
    language = 'zh-CN';
}
export let languages: any = setLg.get(language);
export default language;
