import defaultImg from '../../../../assets/img/user_create/user_default2.png';
import { createIntl, createIntlCache } from 'react-intl';
import { messagesintl } from '../messages';
import Spanish from 'translations/es-mx.json'; //your messages translated with id

const cache = createIntlCache();
const intlExt = createIntl({ locale: 'es-MX', messages: Spanish }, cache); //locale and message can come from Redux or regular import

export const checkboxOptions = [
  {
    label: intlExt.formatMessage(messagesintl.advertisement),
    disabled: false,
    name: 'advertisement'
  },
  {
    label: intlExt.formatMessage(messagesintl.analytics),
    disabled: false,
    name: 'analytics'
  },
  {
    label: intlExt.formatMessage(messagesintl.branches),
    disabled: false,
    name: 'branches'
  },
  {
    label: intlExt.formatMessage(messagesintl.digital_display),
    disabled: false,
    name: 'digital_display'
  },
  {
    label: intlExt.formatMessage(messagesintl.metric),
    disabled: false,
    name: 'metric'
  },
  {
    label: intlExt.formatMessage(messagesintl.purchase_request),
    disabled: false,
    name: 'purchase_request'
  },
  {
    label: intlExt.formatMessage(messagesintl.redemption_pts),
    disabled: false,
    name: 'redemption_pts'
  },
  {
    label: intlExt.formatMessage(messagesintl.surveys),
    disabled: false,
    name: 'survey'
  },
  {
    label: intlExt.formatMessage(messagesintl.sale_off),
    disabled: false,
    name: 'sale_off'
  }
];

export const divisions = [
  {
    label: intlExt.formatMessage(messagesintl.water),
    disabled: false,
    name: 'water'
  },
  {
    label: intlExt.formatMessage(messagesintl.cereal),
    disabled: false,
    name: 'cereal'
  },
  {
    label: intlExt.formatMessage(messagesintl.fb),
    disabled: false,
    name: 'fb'
  },
  {
    label: intlExt.formatMessage(messagesintl.ice),
    disabled: false,
    name: 'ice'
  },
  {
    label: intlExt.formatMessage(messagesintl.natures_heart),
    disabled: false,
    name: 'natures_heart'
  },
  {
    label: intlExt.formatMessage(messagesintl.nutricion),
    disabled: false,
    name: 'nutricion'
  },
  {
    label: intlExt.formatMessage(messagesintl.professional),
    disabled: false,
    name: 'professional'
  },
  {
    label: intlExt.formatMessage(messagesintl.purina),
    disabled: false,
    name: 'purina'
  }
];

export const categories = {
  water: [
    {
      label: intlExt.formatMessage(messagesintl.water),
      disabled: false,
      name: 'water'
    }
  ],
  cereal: [
    {
      label: intlExt.formatMessage(messagesintl.cereal),
      disabled: false,
      name: 'cereal'
    }
  ],
  fb: [
    {
      label: intlExt.formatMessage(messagesintl.drinks),
      disabled: false,
      name: 'drinks'
    },
    {
      label: intlExt.formatMessage(messagesintl.coffees),
      disabled: false,
      name: 'coffees'
    },
    {
      label: intlExt.formatMessage(messagesintl.chocolate_impulse),
      disabled: false,
      name: 'chocolate_impulse'
    },
    {
      label: intlExt.formatMessage(messagesintl.chocolate_mesa),
      disabled: false,
      name: 'chocolate_mesa'
    },
    {
      label: intlExt.formatMessage(messagesintl.creams),
      disabled: false,
      name: 'creams'
    },
    {
      label: intlExt.formatMessage(messagesintl.culinary),
      disabled: false,
      name: 'culinary'
    },
    {
      label: intlExt.formatMessage(messagesintl.dolce_gusto),
      disabled: false,
      name: 'dolce_gusto'
    },
    {
      label: intlExt.formatMessage(messagesintl.lac_culinary),
      disabled: false,
      name: 'lac_culinary'
    },
    {
      label: intlExt.formatMessage(messagesintl.dairy_adults),
      disabled: false,
      name: 'dairy_adults'
    },
    {
      label: intlExt.formatMessage(messagesintl.dairy_ppp),
      disabled: false,
      name: 'dairy_ppp'
    },
    {
      label: intlExt.formatMessage(messagesintl.milk_modifiers),
      disabled: false,
      name: 'milk_modifiers'
    },
    {
      label: intlExt.formatMessage(messagesintl.fortified_nest),
      disabled: false,
      name: 'fortified_nest'
    }
  ],
  ice: [
    {
      label: intlExt.formatMessage(messagesintl.ice),
      disabled: false,
      name: 'ice'
    }
  ],
  natures_heart: [
    {
      label: intlExt.formatMessage(messagesintl.natures_heart),
      disabled: false,
      name: 'natures_heart'
    }
  ],
  nutricion: [
    {
      label: intlExt.formatMessage(messagesintl.baby_food),
      disabled: false,
      name: 'baby_food'
    },
    {
      label: intlExt.formatMessage(messagesintl.infant_formula),
      disabled: false,
      name: 'infant_formula'
    },
    {
      label: intlExt.formatMessage(messagesintl.nidal_nido),
      disabled: false,
      name: 'nidal_nido'
    }
  ],
  professional: [
    {
      label: intlExt.formatMessage(messagesintl.coffees),
      disabled: false,
      name: 'coffees'
    },
    {
      label: intlExt.formatMessage(messagesintl.chocolate_impulse),
      disabled: false,
      name: 'chocolate_impulse'
    },
    {
      label: intlExt.formatMessage(messagesintl.chocolates),
      disabled: false,
      name: 'chocolates'
    },
    {
      label: intlExt.formatMessage(messagesintl.creams),
      disabled: false,
      name: 'creams'
    },
    {
      label: intlExt.formatMessage(messagesintl.culinary),
      disabled: false,
      name: 'culinary'
    },
    {
      label: intlExt.formatMessage(messagesintl.hamburger),
      disabled: false,
      name: 'hamburger'
    },
    {
      label: intlExt.formatMessage(messagesintl.lac_culinary),
      disabled: false,
      name: 'lac_culinary'
    },
    {
      label: intlExt.formatMessage(messagesintl.splenda),
      disabled: false,
      name: 'milk_modifiers'
    },
    {
      label: intlExt.formatMessage(messagesintl.milk_modifiers),
      disabled: false,
      name: 'splenda'
    }
  ],
  purina: [
    {
      label: intlExt.formatMessage(messagesintl.purina),
      disabled: false,
      name: 'purina'
    }
  ],
  none: [
    {
      label: intlExt.formatMessage(messagesintl.none),
      disabled: false,
      name: 'none'
    }
  ]
};

export const none = [
  {
    label: intlExt.formatMessage(messagesintl.none),
    disabled: false,
    name: 'none'
  }
];

export const material_groups = {
  water: [
    {
      label: intlExt.formatMessage(messagesintl.AGÜITAS),
      disabled: false,
      name: 'AGÜITAS'
    },
    {
      label: intlExt.formatMessage(messagesintl.Gerber),
      disabled: false,
      name: 'Gerber'
    },
    {
      label: intlExt.formatMessage(messagesintl.GERBER_4_LTS),
      disabled: false,
      name: 'GERBER_4_LTS'
    },
    {
      label: intlExt.formatMessage(messagesintl.NPV),
      disabled: false,
      name: 'NPV'
    },
    {
      label: intlExt.formatMessage(messagesintl.NPV_4_LTS),
      disabled: false,
      name: 'NPV_4_LTS'
    },
    {
      label: intlExt.formatMessage(messagesintl.NPV_AGUITAS_NAT),
      disabled: false,
      name: 'NPV_AGUITAS_NAT'
    },
    {
      label: intlExt.formatMessage(messagesintl.PANNA),
      disabled: false,
      name: 'PANNA'
    },
    {
      label: intlExt.formatMessage(messagesintl.Perrier),
      disabled: false,
      name: 'Perrier'
    },
    {
      label: intlExt.formatMessage(messagesintl.PERRIER_JUICE),
      disabled: false,
      name: 'PERRIER_JUICE'
    },
    {
      label: intlExt.formatMessage(messagesintl.San_Pellegrino),
      disabled: false,
      name: 'San_Pellegrino'
    },
    {
      label: intlExt.formatMessage(messagesintl.SFB),
      disabled: false,
      name: 'SFB'
    },
    {
      label: intlExt.formatMessage(messagesintl.STM),
      disabled: false,
      name: 'STM'
    },
    {
      label: intlExt.formatMessage(messagesintl.STM_4_LTS),
      disabled: false,
      name: 'STM_4_LTS'
    }
  ],
  cereal: [
    {
      label: intlExt.formatMessage(messagesintl.Barras),
      disabled: false,
      name: 'Barras'
    },
    {
      label: intlExt.formatMessage(messagesintl.Cereal_Carlos_V),
      disabled: false,
      name: 'Cereal_Carlos_V'
    },
    {
      label: intlExt.formatMessage(messagesintl.Cereal_Nesquik),
      disabled: false,
      name: 'Cereal_Nesquik'
    },
    {
      label: intlExt.formatMessage(messagesintl.Cheerios),
      disabled: false,
      name: 'Cheerios'
    },
    {
      label: intlExt.formatMessage(messagesintl.Cookie_Crisp),
      disabled: false,
      name: 'Cookie_Crisp'
    },
    {
      label: intlExt.formatMessage(messagesintl.Corn_Flakes),
      disabled: false,
      name: 'Corn_Flakes'
    },
    {
      label: intlExt.formatMessage(messagesintl.Fitness),
      disabled: false,
      name: 'Fitness'
    },
    {
      label: intlExt.formatMessage(messagesintl.La_Lechera),
      disabled: false,
      name: 'La_Lechera'
    },
    {
      label: intlExt.formatMessage(messagesintl.Lucky_Charms),
      disabled: false,
      name: 'Lucky_Charms'
    },
    {
      label: intlExt.formatMessage(messagesintl.Others),
      disabled: false,
      name: 'Others'
    },
    {
      label: intlExt.formatMessage(messagesintl.Trix),
      disabled: false,
      name: 'Trix'
    }
  ],
  drinks: [
    {
      label: intlExt.formatMessage(messagesintl.Nestea),
      disabled: false,
      name: 'Nestea'
    }
  ],
  coffees: [
    {
      label: intlExt.formatMessage(messagesintl.Cafe_de_Olla),
      disabled: false,
      name: 'Cafe_de_Olla'
    },
    {
      label: intlExt.formatMessage(messagesintl.Cappuccino),
      disabled: false,
      name: 'Cappuccino'
    },
    {
      label: intlExt.formatMessage(messagesintl.Clasico_Descafeinado),
      disabled: false,
      name: 'Clasico_Descafeinado'
    },
    {
      label: intlExt.formatMessage(messagesintl.Cold_Brew),
      disabled: false,
      name: 'Cold_Brew'
    },
    {
      label: intlExt.formatMessage(messagesintl.Decaf),
      disabled: false,
      name: 'Decaf'
    },
    {
      label: intlExt.formatMessage(messagesintl.Dolca),
      disabled: false,
      name: 'Dolca'
    },
    {
      label: intlExt.formatMessage(messagesintl.DulciCrema),
      disabled: false,
      name: 'DulciCrema'
    },
    {
      label: intlExt.formatMessage(messagesintl.Rva_Mexican),
      disabled: false,
      name: 'Rva_Mexican'
    },
    {
      label: intlExt.formatMessage(messagesintl.Tasters),
      disabled: false,
      name: 'Tasters'
    },
    {
      label: intlExt.formatMessage(messagesintl.Clasico),
      disabled: false,
      name: 'Clasico'
    }
  ],
  chocolate_impulse: [
    {
      label: intlExt.formatMessage(messagesintl.Abuelita_Golosina),
      disabled: false,
      name: 'Abuelita_Golosina'
    },
    {
      label: intlExt.formatMessage(messagesintl.Almon_Ris),
      disabled: false,
      name: 'Almon_Ris'
    },
    {
      label: intlExt.formatMessage(messagesintl.Cajetoso_Cacahuatoso),
      disabled: false,
      name: 'Cajetoso_Cacahuatoso'
    },
    {
      label: intlExt.formatMessage(messagesintl.Carlos_V),
      disabled: false,
      name: 'Carlos_V'
    },
    {
      label: intlExt.formatMessage(messagesintl.Carlos_V_Otro),
      disabled: false,
      name: 'Carlos_V_Otro'
    },
    {
      label: intlExt.formatMessage(messagesintl.Crunch),
      disabled: false,
      name: 'Crunch'
    },
    {
      label: intlExt.formatMessage(messagesintl.Freskas),
      disabled: false,
      name: 'Freskas'
    },
    {
      label: intlExt.formatMessage(messagesintl.Galletas),
      disabled: false,
      name: 'Galletas'
    },
    {
      label: intlExt.formatMessage(messagesintl.Kit_Kat),
      disabled: false,
      name: 'Kit_Kat'
    },
    {
      label: intlExt.formatMessage(messagesintl.Larin_Semilla),
      disabled: false,
      name: 'Larin_Semilla'
    },
    {
      label: intlExt.formatMessage(messagesintl.Seasonals),
      disabled: false,
      name: 'Seasonals'
    },
    {
      label: intlExt.formatMessage(messagesintl.Tin_Larin),
      disabled: false,
      name: 'Tin_Larin'
    }
  ],
  professional: [
    {
      label: intlExt.formatMessage(messagesintl.coffees),
      disabled: false,
      name: 'coffees'
    },
    {
      label: intlExt.formatMessage(messagesintl.chocolate_impulse),
      disabled: false,
      name: 'chocolate_impulse'
    },
    {
      label: intlExt.formatMessage(messagesintl.chocolates),
      disabled: false,
      name: 'chocolates'
    },
    {
      label: intlExt.formatMessage(messagesintl.creams),
      disabled: false,
      name: 'creams'
    },
    {
      label: intlExt.formatMessage(messagesintl.culinary),
      disabled: false,
      name: 'culinary'
    },
    {
      label: intlExt.formatMessage(messagesintl.hamburger),
      disabled: false,
      name: 'hamburger'
    },
    {
      label: intlExt.formatMessage(messagesintl.lac_culinary),
      disabled: false,
      name: 'lac_culinary'
    },
    {
      label: intlExt.formatMessage(messagesintl.splenda),
      disabled: false,
      name: 'milk_modifiers'
    },
    {
      label: intlExt.formatMessage(messagesintl.milk_modifiers),
      disabled: false,
      name: 'splenda'
    }
  ],
  purina: [
    {
      label: intlExt.formatMessage(messagesintl.purina),
      disabled: false,
      name: 'purina'
    }
  ],
  none: [
    {
      label: intlExt.formatMessage(messagesintl.none),
      disabled: false,
      name: 'none'
    }
  ]
};

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
