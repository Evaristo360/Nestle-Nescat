import React from 'react';
import { suspensePageStyle } from '../styles';
import { useTheme } from 'hooks/useTheme';

function SuspensePage() {
  const { currentTheme } = useTheme();

  return (
    <section css={suspensePageStyle({ currentTheme })}>
      <h1 className="suspense-page--title">Ads & research</h1>
      <h2 className="suspense-page--subtitle">Plataforma de gestión</h2>

      <div className="suspense-page--loading-wrapper">
        <div className="suspense-page--decorator" />
        <div className="suspense-page--decorator" />
        <div className="suspense-page--decorator" />
      </div>
    </section>
  );
}

export default SuspensePage;
