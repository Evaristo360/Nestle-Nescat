import React from 'react';
import { LanguageProvider } from 'components/Language';
import { ThemeProvider } from 'providers/theme';
import { config } from 'providers/config';
import { translations } from 'translations';
import { GlobalErrorModal } from 'components/GlobalErrorModal';


export function RootGlobalError({ message = '' }) {
  return (
    <ThemeProvider>
      <LanguageProvider
        locale={config.siteConfig.languageCode}
        translations={translations}
      >
        <GlobalErrorModal text={message} />
      </LanguageProvider>
    </ThemeProvider>
  );
}
