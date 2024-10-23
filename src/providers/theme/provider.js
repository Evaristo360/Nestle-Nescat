import useLocalStorage from 'hooks/useLocalStorage';
import React, { useState, useMemo } from 'react';

export const defaultThemes = {
  dark: {
    emphasis: '#FFFFFF', // DEPRECATED
    button: '#007CBA', // DEPRECATED
    button_Text: '#FFFFFF', // DEPRECATED
    active_button: '#5EC9FF', // DEPRECATED
    active_button_Text: '#FFFFFF', // DEPRECATED
    backgroundHeadTable: '#007CBA0A', // DEPRECATED
    backgroundAccent: '#000000', // DEPRECATED
    primary: '#20B5D3', // DEPRECATED

    themeDark: true,
    background: '#002169',
    texts: '#FFFFFF',
    titles: '#FFFFFF',
    subtitles: '#007CBA',
    buttons: '#007CBA',
    buttons_hover: '#142767',
    buttons_secondary: '#1C1C1C',
    buttons_secondary_hover: '#2E2E2E',
    menu: '#212529',
    table_background: '#FFFFFF',
    table_pagination_text: '#FFFFFF',
    drawer_title: '#007CBA',
  },
  light: {
    emphasis: '#000000', // DEPRECATED
    button: '#000000', // DEPRECATED
    button_Text: '#FFFFFF', // DEPRECATED
    active_button: '#1C1C1C', // DEPRECATED
    active_button_Text: '#FFFFFF', // DEPRECATED
    backgroundHeadTable: '#007CBA0A', // DEPRECATED
    backgroundAccent: '#000000', // DEPRECATED
    primary: '#20B5D3', // DEPRECATED

    themeDark: false,
    background: '#FFFFFF',
    texts: '#63513D',
    titles: '#002169',
    subtitles: '#002169',
    buttons: '#007CBA',
    buttons_hover: '#142767',
    buttons_secondary: '#1C1C1C',
    buttons_secondary_hover: '#2E2E2E',
    menu: '#002169',
    table_background: '#007cba0a',
    table_pagination_text: '#1c1c1c',
    drawer_title: '#FFFFFF',
  }
};

export const ThemeContext = React.createContext();

export const ThemeProvider = (props) => {
  const { getItem, setItem } = useLocalStorage();
  const currentMode = loadCurrentMode();
  const [mode, updateMode] = useState(currentMode);
  const [darkTheme, updateDark] = useState(defaultThemes.dark);
  const [lightTheme, updateLight] = useState(defaultThemes.light);
  const [currentTheme, updateCurrentTheme] = useState(defaultThemes[currentMode]);

  function updateThemes(dark, light, newMode) {
    updateDark(dark);
    updateLight(light);
    updateMode(newMode);
    if (newMode === 'light') {
      updateCurrentTheme(light);
    } else {
      updateCurrentTheme(dark);
    }
  }

  function loadCurrentMode(){
    let theme = getItem('theme');
    if(theme){
      return theme;
    }
    return 'light';
  }

  function changeMode(newMode) {
    updateMode(newMode);
    if (newMode === 'light') {
      setItem('theme', 'light');
      updateCurrentTheme(lightTheme);
    } else {
      setItem('theme', 'dark');
      updateCurrentTheme(darkTheme);
    }
  }

  //El uso de memo es para evitar el renderizado cuando los valores no cambian a pesar de ser actualizados
  const value = useMemo(
    () => ({
      mode,
      currentTheme,
      changeMode,
      updateThemes
    }),
    [mode, currentTheme]
  );

  return <ThemeContext.Provider value={value} {...props} />;
};
