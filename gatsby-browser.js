/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import * as Sentry from '@sentry/browser';

import { ThemeProvider } from './src/contexts/ThemeContext';
import { LayoutProvider } from './src/contexts/LayoutContext';

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `Ce site a été mis à jour. Voulez-vous recharger la page ?`
  );

  if (answer === true) {
    window.location.reload();
  }
};

const sentryConfig = {
  dsn: 'https://f770273393d44fc3bf916a6fb6ea3e41@sentry.io/1493414',
  // Optional settings, see https://docs.sentry.io/clients/node/config/#optional-settings
  environment: process.env.NODE_ENV,
  enabled: (() =>
    ['production', 'stage'].indexOf(process.env.NODE_ENV) !== -1)(),
};

Sentry.init(sentryConfig);

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>
    <LayoutProvider>{element}</LayoutProvider>
  </ThemeProvider>
);
