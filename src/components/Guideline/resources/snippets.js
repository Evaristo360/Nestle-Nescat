/* eslint-disable no-useless-escape */

export const snippets = {
  mappers: [
    {
      title: 'mappers01',
      code: `
        import { responseMapper } from 'utils/responseMapper';

        // Template is used to map data to new object with specific structure
        // The value of each property is the path from which the value of the original object is extracted
        const templateUser = {
          id: 'user_id',
          name: 'user_name',
          username: 'user_username',
          email: 'user_email',
          address: {
            street: 'user_address.address_street',
            suite: 'user_address.address_suite',
            city: 'user_address.address_city',
            zipcode: 'user_address.address_zipcode',
            geo: {
              lat: 'user_address.address_geo.lat',
              lng: 'user_address.address_geo.lng'
            }
          },
          phone: 'user_phone',
          website: 'user_website',
          company: {
            name: 'user_company.company_name',
            catchPhrase: 'user_company.company_catchPhrase',
            bs: 'user_company.company_bs',
            subcompanies: [  // you can also map keys that contain arrays of objects
              'user_company.company_subcompanies', // Key or path to extract data to format
              {
                name: 'company_name'
              }
            ]
          }
        };

        // Example of API Response
        const userResponse = {
          user_id: 1,
          user_name: 'Leanne Graham',
          user_username: 'Bret',
          user_email: 'Sincere@april.biz',
          user_address: {
            address_street: 'Kulas Light',
            address_suite: 'Apt. 556',
            address_city: 'Gwenborough',
            address_zipcode: '92998-3874',
            address_geo: { lat: '-37.3159', lng: '81.1496' }
          },
          user_phone: '1-770-736-8031 x56442',
          user_website: 'hildegard.org',
          user_company: {
            company_name: 'Romaguera-Crona',
            company_catchPhrase: 'Multi-layered client-server neural-net',
            company_bs: 'harness real-time e-markets',
            company_subcompanies: [
              {
                company_name: 'Robel-Corkery',
                company_catchPhrase: 'Multi-tiered zero tolerance productivity',
                company_bs: 'transition cutting-edge web services'
              },
              {
                company_name: 'Keebler LLC',
                company_catchPhrase: 'User-centric fault-tolerant solution',
                company_bs: 'revolutionize end-to-end systems'
              }
            ]
          }
        };

        // The responseMapper function receives an object with 2 keys: template and data
        const responseMapped = responseMapper({
          template: usersMapper,
          data: userResponse
        });

        // Result of mapper
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: { lat: '-37.3159', lng: '81.1496' }
          },
          phone: '1-770-736-8031 x56442',
          website: 'hildegard.org',
          company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
            subcompanies: [{ name: 'Robel-Corkery' }, { name: 'Keebler LLC' }]
          }
        }
      `
    },
    {
      title: 'mappers02',
      code: `
        import { responseMapper } from 'utils/responseMapper';

        // Template is used to map data to new object with specific structure
        // The value of each property is the path from which the value of the original object is extracted
        const templateUser = {
          id: 'user_id',
          name: 'user_name',
          username: 'user_username',
          email: 'user_email',
          address: {
            street: 'user_address.address_street',
            suite: 'user_address.address_suite',
            city: 'user_address.address_city',
            zipcode: 'user_address.address_zipcode',
            geo: {
              lat: 'user_address.address_geo.lat',
              lng: 'user_address.address_geo.lng'
            }
          },
          phone: 'user_phone',
          website: 'user_website',
          company: {
            name: 'user_company.company_name',
            catchPhrase: 'user_company.company_catchPhrase',
            bs: 'user_company.company_bs',
            subcompanies: [  // you can also map keys that contain arrays of objects
              'user_company.company_subcompanies', // Key or path to extract data to format
              {
                name: 'company_name'
              }
            ]
          }
        };

        // Example of API Response
        const usersResponse = [
          {
            user_id: 1,
            user_name: 'Leanne Graham',
            user_username: 'Bret',
            user_email: 'Sincere@april.biz',
            user_address: {
              address_street: 'Kulas Light',
              address_suite: 'Apt. 556',
              address_city: 'Gwenborough',
              address_zipcode: '92998-3874',
              address_geo: { lat: '-37.3159', lng: '81.1496' }
            },
            user_phone: '1-770-736-8031 x56442',
            user_website: 'hildegard.org',
            user_company: {
              company_name: 'Romaguera-Crona',
              company_catchPhrase: 'Multi-layered client-server neural-net',
              company_bs: 'harness real-time e-markets',
              company_subcompanies: [
                {
                  company_name: 'Robel-Corkery',
                  company_catchPhrase: 'Multi-tiered zero tolerance productivity',
                  company_bs: 'transition cutting-edge web services'
                },
                {
                  company_name: 'Keebler LLC',
                  company_catchPhrase: 'User-centric fault-tolerant solution',
                  company_bs: 'revolutionize end-to-end systems'
                }
              ]
            }
          },
          {
            user_id: 2,
            user_name: 'Leanne Graham',
            user_username: 'Bret',
            user_email: 'Sincere@april.biz',
            user_address: {
              address_street: 'Kulas Light',
              address_suite: 'Apt. 556',
              address_city: 'Gwenborough',
              address_zipcode: '92998-3874',
              address_geo: { lat: '-37.3159', lng: '81.1496' }
            },
            user_phone: '1-770-736-8031 x56442',
            user_website: 'hildegard.org',
            user_company: {
              company_name: 'Romaguera-Crona',
              company_catchPhrase: 'Multi-layered client-server neural-net',
              company_bs: 'harness real-time e-markets',
              company_subcompanies: [
                {
                  company_name: 'Robel-Corkery',
                  company_catchPhrase: 'Multi-tiered zero tolerance productivity',
                  company_bs: 'transition cutting-edge web services'
                },
                {
                  company_name: 'Keebler LLC',
                  company_catchPhrase: 'User-centric fault-tolerant solution',
                  company_bs: 'revolutionize end-to-end systems'
                }
              ]
            }
          }
        ];

        // The responseMapper function receives an object with 2 keys: template and data
        const responseMapped = responseMapper({
          template: usersMapper,
          data: usersResponse
        });

        // Result of mapper
        [
          {
            id: 1,
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz',
            address: {
              street: 'Kulas Light',
              suite: 'Apt. 556',
              city: 'Gwenborough',
              zipcode: '92998-3874',
              geo: { lat: '-37.3159', lng: '81.1496' }
            },
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            company: {
              name: 'Romaguera-Crona',
              catchPhrase: 'Multi-layered client-server neural-net',
              bs: 'harness real-time e-markets',
              subcompanies: [{ name: 'Robel-Corkery' }, { name: 'Keebler LLC' }]
            }
          },
          {
            id: 2,
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz',
            address: {
              street: 'Kulas Light',
              suite: 'Apt. 556',
              city: 'Gwenborough',
              zipcode: '92998-3874',
              geo: { lat: '-37.3159', lng: '81.1496' }
            },
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            company: {
              name: 'Romaguera-Crona',
              catchPhrase: 'Multi-layered client-server neural-net',
              bs: 'harness real-time e-markets',
              subcompanies: [{ name: 'Robel-Corkery' }, { name: 'Keebler LLC' }]
            }
          }
        ]
      `
    }
  ],
  context: [
    {
      title: 'context01',
      code: `
        // components/Language/LanguageContext.jsx
        import { createContext } from 'react';

        export const LanguageContext = createContext();

        
        // components/Theme/ThemeContext.jsx
        import { createContext } from 'react';

        export const ThemeContext = createContext();
    `
    }
  ],
  provider: [
    {
      title: 'provider01',
      code: `
        // components/Theme/ThemeProvider.jsx
        import React, { useState, useMemo } from 'react';
        import PropTypes from 'prop-types';
        import useMediaQuery from '@material-ui/core/useMediaQuery';
        import {
          createMuiTheme,
          ThemeProvider as MUIThemeProvider
        } from '@material-ui/core/styles';
        import CssBaseline from '@material-ui/core/CssBaseline';
        
        import { config } from 'providers/config';
        import { skins, availableSkins } from 'providers/theme';
        import { ThemeContext } from './ThemeContext';
        
        const ThemeProvider = (props) => {
          const { children } = props;
          const { siteConfig } = config;
          const { LIGHT, DARK } = availableSkins;
          const [theme, setTheme] = useState(siteConfig.defaultTheme); // Local State of provider in some cases you can also have this in a hook
          const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
          const browserTheme = prefersDarkMode ? DARK : LIGHT;
          const mandatoryAppTheme = siteConfig.allowBrowserTheme ? browserTheme : theme;
        
          // Contains a value of context
          const contextValue = useMemo(
            () => ({
              theme,
              availableSkins,
              handleChangeTheme: setTheme
            }),
            [theme] // React useMemo helps us avoid unnecessary renders by computing the context value only when this variable changes its value.
          );
        
          const materialTheme = useMemo(
            () =>
              createMuiTheme({
                palette: { type: mandatoryAppTheme },
                ...skins[mandatoryAppTheme]
              }),
            [theme]
          );
        
          // Pass context value & wrap the child component
          return (
            <ThemeContext.Provider value={contextValue}>
              <MUIThemeProvider theme={materialTheme}>
                <CssBaseline />
                {children}
              </MUIThemeProvider>
            </ThemeContext.Provider>
          );
        };
        
        ThemeProvider.propTypes = {
          children: PropTypes.node.isRequired
        };
        
        export { ThemeProvider };
      `
    },
    {
      title: 'provider02',
      code: `
        // components/Language/LanguageProvider.jsx
        import React, { useState, useMemo } from 'react';
        import PropTypes from 'prop-types';
        import { IntlProvider } from 'react-intl';
        import { LanguageContext } from './LanguageContext';
        import { getLocaleData } from './helpers';

        const LanguageProvider = (props) => {
          const { children, translations, locale: defaultLocale } = props;
          const [locale, setLocale] = useState(defaultLocale); // Local State of provider in some cases you can also have this in a hook

          const localeData = getLocaleData(locale);

          const contextValue = useMemo(
            () => ({
              locale,
              availableLocales: Object.keys(translations),
              handleChangeLocale: setLocale,
              ...localeData
            }),
            [locale] // React useMemo helps us avoid unnecessary renders by computing the context value only when this variable changes its value.
          );

          // Pass context value & wrap the child component
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
      `
    },
    {
      title: 'provider03',
      code: `
        // src/Root.jsx
        import React from 'react';
        import { App } from './components/App';
        import { LanguageProvider } from './components/Language';
        import { ThemeProvider } from './components/Theme';
        import { ExampleDataListProvider } from './components/ExampleDataList';
        import { ContextLogger } from './components/ContextLogger';

        import translations from './translations';
        import { config } from './providers/config';
        import appContext from './context';

        const contextConfig = { objectDiffs: true, arrayDiffs: false };

        export function Root() {
          return (
            <>
              <ThemeProvider>
                <LanguageProvider
                  locale={config.siteConfig.languageCode}
                  translations={translations}
                >
                  <ExampleDataListProvider>
                    <App />

                    <ContextLogger contexts={appContext} config={contextConfig} />
                  </ExampleDataListProvider>
                </LanguageProvider>
              </ThemeProvider>
            </>
          );
        }
      `
    }
  ],
  styles: [
    {
      title: 'styles01',
      code: `
        import { makeStyles } from '@material-ui/core/styles';

        const useStyles = makeStyles((theme) => ({
          container: {
            color: theme.palette.common.white, // Use common colors configured in palette of theme
            backgroundColor: theme.palette.primary.main // Use main primary color configured in theme
            marginTop: theme.spacing(2) // Use spacing configured in theme
          },
          subtitle: {
            display: 'flex',
            alignItems: 'center',
            '& svg': {  // Access to childs of element (this is similar to scss)
              marginRight: theme.spacing(0.5)
            }
          },
          iconFile: {
            width: theme.typography.pxToRem(40),
            height: theme.typography.pxToRem(40),
            marginRight: theme.spacing(1)
          },
          fileName: {
            fontSize: theme.typography.pxToRem(40), // Use responsive fontSize configured in theme
            [theme.breakpoints.down('sm')]: {
              fontSize: theme.typography.pxToRem(28),
              fontWeight: 400
            }
          },
          headerSection: {
            [theme.breakpoints.down('sm')]: { // Use theme breakpoints to add specific styles for each screen resolution
              display: 'none'
            }
          },
          pre: {
            whiteSpace: 'pre-wrap'
          },
          codeBlock: {
            width: '100%',
            fontFamily: 'consolas'
          }
        }));
        
        export { useStyles };
      
      `
    }
  ],
  messages: [
    {
      title: 'messages01',
      code: `
        import { defineMessages } from 'react-intl';

        export const messages = defineMessages({
          title: {
            id: 'components.Example.title',
            defaultMessage: 'Hola!!'
          },
          otherText: {
            id: 'components.Example.otherText',
            defaultMessage: 'Este es otro texto'
          }
        });
      `
    },
    {
      title: 'messages02',
      code: `yarn extract-intl`
    }
  ],
  config: [
    {
      title: 'config01',
      code: `
        // providers/config/provider.js
        export const config = {
          appId: (process.env.REACT_APP_NAME || '').replace(/@octopy\/react-spa-/, ''),
          siteConfig: {
            languageCode: (process.env.REACT_APP_LANGUAGE_CODE || '').toLowerCase(),
            defaultTheme: process.env.REACT_APP_DEFAULT_THEME,
            allowBrowserTheme:
              process.env.REACT_APP_THEME_ENABLE_BROWSER_SUPPORT === 'true'
          },
          endpoints: {
            mainBackendUrl: process.env.REACT_APP_MAIN_BACKEND_URL
          }
        };

        // Use siteConfig in a component
        import { config } from 'providers/config';

        const Example = () => {
          const { siteConfig } = config;

          return (
            <h1>languageCode is {siteConfig.languageCode}</h1>
            <h1>defaultTheme is {siteConfig.defaultTheme}</h1>
          );
        }
    `
    }
  ],
  translations: [
    {
      title: 'translations01',
      code: `
        // ExampleMessages.js
        import { defineMessages } from 'react-intl';

        export const messages = defineMessages({
          title: {
            id: 'components.Example.title',
            defaultMessage: 'Hello there!'
          }
        });

        // Example.jsx
        import { useIntl } from 'react-intl';
        import { messages } from './ExampleMessages.js';

        const Example = () => {
          const intl = useIntl();

          return (
            <h1>
              {intl.formatMessage(messages.title}
            </h1>
          );
        }
    `
    },
    {
      title: 'translations02',
      code: `
        // ExampleMessages.js
        import { defineMessages } from 'react-intl';

        export const messages = defineMessages({
          title: {
            id: 'components.Example.title',
            defaultMessage: 'Hello there!'
          }
        });

        // Example.jsx
        import { FormattedMessage } from 'react-intl';
        import { messages } from './ExampleMessages.js';

        const Example = () => {
          return (
            <h1>
              <FormattedMessage {...messages.title} />
            </h1>
          );
        }
    `
    },
    {
      title: 'translations03',
      code: `yarn extract-intl`
    }
  ]
};
