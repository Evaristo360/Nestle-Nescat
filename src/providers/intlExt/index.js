import { createIntl, createIntlCache } from 'react-intl';
import { translations } from 'translations';
import { config } from 'providers/config';

const language = translations[config.siteConfig.languageCode];
const languageCode = config.siteConfig.languageCode;

const cache = createIntlCache();

export const intlExt = createIntl(
  { locale: languageCode, messages: language },
  cache
);
