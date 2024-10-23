import { createIntl, createIntlCache } from 'react-intl';
import { messages as formMessages } from '../PromotionsFormEditMessages';
import Spanish from 'translations/es-mx.json'; //your messages translated with id

const cache = createIntlCache();
const intlExt = createIntl({ locale: 'es-MX', messages: Spanish }, cache); //locale and message can come from Redux or regular import

export const sale_off_type = [
  {
    label: intlExt.formatMessage(formMessages.user),
    disabled: false,
    value: 1
  },
  {
    label: intlExt.formatMessage(formMessages.totalNestle),
    disabled: false,
    value: 2
  }
];
