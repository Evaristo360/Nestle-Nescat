import defaultImg from '../../../../assets/img/user_create/user_default2.png';
import { createIntl, createIntlCache } from 'react-intl';
import { messagesintl } from '../../messages';
import Spanish from 'translations/es-mx.json'; //your messages translated with id

const cache = createIntlCache();
const intlExt = createIntl({ locale: 'es-MX', messages: Spanish }, cache); //locale and message can come from Redux or regular import

export const checkboxOptions = [
  {
    label: intlExt.formatMessage(messagesintl.analytics),
    disabled: false,
    name: 'analytics'
  },
  {
    label: intlExt.formatMessage(messagesintl.digital_display),
    disabled: false,
    name: 'digital_display'
  },
  {
    label: intlExt.formatMessage(messagesintl.totem),
    disabled: false,
    name: 'totem'
  },
  {
    label: intlExt.formatMessage(messagesintl.client_module),
    disabled: false,
    name: 'client_module'
  },
  {
    label: intlExt.formatMessage(messagesintl.branches),
    disabled: false,
    name: 'branches'
  },
  {
    label: intlExt.formatMessage(messagesintl.product),
    disabled: false,
    name: 'product'
  },
  {
    label: intlExt.formatMessage(messagesintl.redemption_pts),
    disabled: false,
    name: 'redemption_pts'
  },
  {
    label: intlExt.formatMessage(messagesintl.load_pts),
    disabled: false,
    name: 'load_pts'
  },
  {
    label: intlExt.formatMessage(messagesintl.customer),
    disabled: false,
    name: 'customer'
  },
  {
    label: intlExt.formatMessage(messagesintl.purchase_request),
    disabled: false,
    name: 'purchase_request'
  },
  {
    label: intlExt.formatMessage(messagesintl.sale_off),
    disabled: false,
    name: 'sale_off'
  },
  {
    label: intlExt.formatMessage(messagesintl.management),
    disabled: false,
    name: 'management'
  },
  {
    label: intlExt.formatMessage(messagesintl.advertisement),
    disabled: false,
    name: 'advertisement'
  }
];

export const userNestleOptions = [
  {
    label: intlExt.formatMessage(messagesintl.analytics),
    disabled: false,
    name: 'analytics'
  },
  {
    label: intlExt.formatMessage(messagesintl.digital_display),
    disabled: false,
    name: 'digital_display'
  },
  {
    label: intlExt.formatMessage(messagesintl.totem),
    disabled: false,
    name: 'totem'
  },
  {
    label: intlExt.formatMessage(messagesintl.client_module),
    disabled: false,
    name: 'client_module'
  },
  {
    label: intlExt.formatMessage(messagesintl.branches),
    disabled: false,
    name: 'branches'
  },
  {
    label: intlExt.formatMessage(messagesintl.product),
    disabled: false,
    name: 'product'
  },
  {
    label: intlExt.formatMessage(messagesintl.redemption_pts),
    disabled: false,
    name: 'redemption_pts'
  },
  {
    label: intlExt.formatMessage(messagesintl.load_pts),
    disabled: false,
    name: 'load_pts'
  },
  {
    label: intlExt.formatMessage(messagesintl.customer),
    disabled: false,
    name: 'customer'
  },
  {
    label: intlExt.formatMessage(messagesintl.purchase_request),
    disabled: false,
    name: 'purchase_request'
  },
  {
    label: intlExt.formatMessage(messagesintl.sale_off),
    disabled: false,
    name: 'sale_off'
  },
  {
    label: intlExt.formatMessage(messagesintl.advertisement),
    disabled: false,
    name: 'advertisement'
  }
];

export const userClientOptions = [
  {
    label: intlExt.formatMessage(messagesintl.analytics),
    disabled: false,
    name: 'analytics'
  },
  {
    label: intlExt.formatMessage(messagesintl.digital_display),
    disabled: false,
    name: 'digital_display'
  },
  {
    label: intlExt.formatMessage(messagesintl.totem),
    disabled: false,
    name: 'totem'
  },
  {
    label: intlExt.formatMessage(messagesintl.branches),
    disabled: false,
    name: 'branches'
  },
  {
    label: intlExt.formatMessage(messagesintl.redemption_pts),
    disabled: false,
    name: 'redemption_pts'
  },
  {
    label: intlExt.formatMessage(messagesintl.purchase_request),
    disabled: false,
    name: 'purchase_request'
  },
  {
    label: intlExt.formatMessage(messagesintl.sale_off),
    disabled: false,
    name: 'sale_off'
  }
];

export const useradminClientOptions = [
  {
    label: intlExt.formatMessage(messagesintl.analytics),
    disabled: false,
    name: 'analytics'
  },
  {
    label: intlExt.formatMessage(messagesintl.digital_display),
    disabled: false,
    name: 'digital_display'
  },
  {
    label: intlExt.formatMessage(messagesintl.totem),
    disabled: false,
    name: 'totem'
  },
  {
    label: intlExt.formatMessage(messagesintl.branches),
    disabled: false,
    name: 'branches'
  },
  {
    label: intlExt.formatMessage(messagesintl.redemption_pts),
    disabled: false,
    name: 'redemption_pts'
  },
  {
    label: intlExt.formatMessage(messagesintl.purchase_request),
    disabled: false,
    name: 'purchase_request'
  },
  {
    label: intlExt.formatMessage(messagesintl.sale_off),
    disabled: false,
    name: 'sale_off'
  },
  {
    label: intlExt.formatMessage(messagesintl.management),
    disabled: false,
    name: 'management'
  }
];

export const initialData = {
  photo: {
    name: intlExt.formatMessage(messagesintl.noSelectedFile),
    size: intlExt.formatMessage(messagesintl.maxSize),
    file: null,
    url: defaultImg
  },
  perms: checkboxOptions.map((option) => ({
    name: option.name,
    checked: false
  })),
  email: '',
  name: '',
  phone: ''
};

export const initialDataAdminClient = {
  photo: {
    name: intlExt.formatMessage(messagesintl.noSelectedFile),
    size: intlExt.formatMessage(messagesintl.maxSize),
    file: null,
    url: defaultImg
  },
  perms: useradminClientOptions.map((option) => ({
    name: option.name,
    checked: false
  })),
  email: '',
  name: '',
  phone: ''
};

export const initialDataNestle = {
  photo: {
    name: intlExt.formatMessage(messagesintl.noSelectedFile),
    size: intlExt.formatMessage(messagesintl.maxSize),
    file: null,
    url: defaultImg
  },
  perms: userNestleOptions.map((option) => ({
    name: option.name,
    checked: false
  })),
  email: '',
  name: '',
  phone: ''
};

export const initialDataClient = {
  photo: {
    name: intlExt.formatMessage(messagesintl.noSelectedFile),
    size: intlExt.formatMessage(messagesintl.maxSize),
    file: null,
    url: defaultImg
  },
  perms: userClientOptions.map((option) => ({
    name: option.name,
    checked: false
  })),
  email: '',
  name: '',
  phone: ''
};
