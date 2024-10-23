import React from 'react';
import { Drawer, Button, Switch } from '@material-ui/core';
import { MenuGroup } from 'components/MenuGroup';
import { useStyles } from './MenuStyles';
import { useTheme } from 'hooks/useTheme';
import { useStyles as useMenuGroupStyles } from 'components/MenuGroup/MenuGroupStyles';

const Menu = ({ groups, visible, onClose }) => {
  const { currentTheme, mode, changeMode } = useTheme();
  const classes = useStyles({ currentTheme });
  const menuGroupClasses = useMenuGroupStyles();
  const use_dark_mode = mode === 'dark';
  const updateDarkMode = (event) =>
    changeMode(mode === 'dark' ? 'light' : 'dark');

  return (
    <Drawer
      anchor="right"
      open={visible}
      onClose={onClose}
      className={classes.root}
    >
      <div className={classes.containerEnd}>
        <Button onClick={onClose} className={classes.buttonClose}>
          Cerrar
        </Button>
      </div>
      <section>
        {Object.keys(groups).map((name, index) => (
          <MenuGroup
            label={groups[name].label}
            items={groups[name].items}
            onClick={onClose}
            key={index}
          />
        ))}
        <div className={menuGroupClasses.root}>
          <p className={menuGroupClasses.groupName}>Configurar</p>
          <div
            className={[
              menuGroupClasses.link,
              menuGroupClasses.linkActive
            ].join(' ')}
          >
            <Switch
              checked={use_dark_mode}
              onChange={updateDarkMode}
              name="dark_mode"
              inputProps={{ 'aria-label': 'Dark mode' }}
              color="default"
              size="small"
            />
            <p>Habilitar modo oscuro</p>
          </div>
        </div>
        <p className={classes.poweredBy}>Powered by Octopy</p>
      </section>
    </Drawer>
  );
};

export { Menu };
