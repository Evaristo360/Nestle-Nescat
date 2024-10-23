import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { LanguageContext } from './LanguageContext';
import { getLocaleData } from './helpers';

const LanguageProvider = (props) => {
  const { children, translations, locale: defaultLocale } = props;
  const [locale, setLocale] = useState(defaultLocale);

  const localeData = getLocaleData(locale);

  const contextValue = useMemo(
    () => ({
      locale,
      availableLocales: Object.keys(translations),
      handleChangeLocale: setLocale,
      ...localeData
    }),
    [locale]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      <IntlProvider locale={locale} messages={translations[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  translations: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export { LanguageProvider };
