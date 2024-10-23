import React from 'react';
import { Drawer as MaterialDrawer, Box, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useDrawer } from './hooks/useDrawer';
import { useStyles } from './DrawerStyles';

const Drawer = () => {
  const classes = useStyles();
  const { drawerState, handleCloseDrawer } = useDrawer();

  const {
    show,
    title,
    body,
    isDismissible,
    closeButton,
    configProps
  } = drawerState;
  const { anchor } = configProps;

  const toggleDrawer = (event) => {
    if (
      !isDismissible &&
      ((event.type === 'keydown' && event.key === 'Escape') ||
        event.type === 'click')
    ) {
      return;
    }

    handleCloseDrawer();
  };

  const drawerClasses = { root: classes.root, paper: classes.container };

  return (
    <MaterialDrawer
      anchor={anchor}
      open={show}
      onClose={toggleDrawer}
      classes={drawerClasses}
    >
      <Box width={1}>
        <Box
          width={1}
          p={2}
          display="flex"
          justifyContent={title && closeButton ? 'space-between' : 'flex-end'}
          alignItems="center"
        >
          {title}
          {closeButton && (
            <IconButton onClick={handleCloseDrawer}>
              <Close />
            </IconButton>
          )}
        </Box>

        {body}
      </Box>
    </MaterialDrawer>
  );
};

export { Drawer };
