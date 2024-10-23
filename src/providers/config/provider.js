export const config = {
  appId: (process.env.REACT_APP_NAME || '').replace(/@octopy\/react-spa-/, ''),
  siteConfig: {
    languageCode: (process.env.REACT_APP_LANGUAGE_CODE || '').toLowerCase(),
    defaultTheme: process.env.REACT_APP_DEFAULT_THEME,
    allowBrowserTheme:
      process.env.REACT_APP_THEME_ENABLE_BROWSER_SUPPORT === 'true',
    apiUrl: process.env.REACT_APP_MAIN_BACKEND_URL || '',
    appUrl: process.env.REACT_APP_DASH_URL || '',
    prefixStorage: process.env.REACT_APP_PREFIX_STORAGE || '',
    checkRoutePerms: process.env.REACT_APP_CHECK_ROUTE_PERMS === 'true',
    termsUrl: process.env.REACT_APP_TERMS_URL
  },
  endpoints: {
    mainBackendUrl: process.env.REACT_APP_MAIN_BACKEND_URL
  },
};
