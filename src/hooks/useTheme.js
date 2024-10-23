import React from 'react';
import { ThemeContext } from '../providers/theme';

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme debe ser usado dentro un provedor ThemeContext');
  }

  return context;
}
