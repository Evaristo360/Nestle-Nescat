import { useEffect, useState } from 'react';
import useAxios from './useAxios';
import { defaultThemes } from 'providers/theme';
import _ from 'lodash';

const useUserThemes = () => {
  const [dark, setDark] = useState(defaultThemes.dark);
  const [light, setLight] = useState(defaultThemes.light);
  const [mode, setMode] = useState('dark');
  const { get } = useAxios();

  useEffect(() => {
    /*
     // TODO: activate when api response the right theme
    getThemes().then(({ light, dark, mode }) => {
      setLight(light);
      setDark(dark);
      setMode(mode);
    });
    */
  }, []);

  const getThemes = async () => {
    let dark = defaultThemes.dark,
      light = defaultThemes.light,
      mode = 'dark';

    try {
      const response = await get('/colors');
      const result = _.get(response, 'data.result.items[0]', {});

      dark.background = result.dark_mode_background;
      dark.titles = result.dark_mode_titles;
      dark.texts = result.dark_mode_texts;
      dark.emphasis = result.dark_mode_emphasis;
      dark.button = result.dark_mode_button;
      dark.button_Text = result.dark_mode_button_text;
      dark.active_button = result.dark_mode_active_button;
      dark.active_button_Text = result.dark_mode_active_button_text;
      light.background = result.light_mode_background;
      light.titles = result.light_mode_titles;
      light.texts = result.light_mode_texts;
      light.emphasis = result.light_mode_emphasis;
      light.button = result.light_mode_button;
      light.button_Text = result.light_mode_button_text;
      light.active_button = result.light_mode_active_button;
      light.active_button_Text = result.light_mode_active_button_text;
      mode = result.use_darkmode === 0 ? 'light' : 'dark';
    } catch (_) {}

    return { dark, light, mode };
  };

  return { dark, light, mode };
};

export default useUserThemes;
