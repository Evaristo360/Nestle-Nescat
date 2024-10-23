import React from 'react';
import { HashRouter } from 'react-router-dom';
import { App } from 'components/App';
import { LanguageProvider } from 'components/Language';
import { ThemeProvider } from 'providers/theme';
import { LoaderProvider } from 'components/Loader';
import { ContextLogger } from 'components/ContextLogger';
import { config } from 'providers/config';
import { translations } from './translations';
import appContext from './context';

const contextConfig = { objectDiffs: true, arrayDiffs: false };

export function Root() {
  return (
    <ThemeProvider>
      <LanguageProvider
        locale={config.siteConfig.languageCode}
        translations={translations}
      >        
        <LoaderProvider>
          <HashRouter>
            <App />
          </HashRouter>
          <ContextLogger contexts={appContext} config={contextConfig} />
        </LoaderProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
