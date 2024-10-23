import React from 'react';
import { config } from 'providers/config';

const url = config.siteConfig.termsUrl;

export const Terms = () => {
  if (!url) return null;
  return (
    <iframe
      src={url}
      frameBorder="0"
      width="100%"
      style={{ height: '100vh' }}
    ></iframe>
  );
};
