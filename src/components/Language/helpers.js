function getLocaleData(locale) {
  const localeSplited = locale.split('-');
  const [languageCode, countryCode] = localeSplited;

  return {
    languageCode,
    countryCode
  };
}

export { getLocaleData };
