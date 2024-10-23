import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { DrawerContext, initialState } from './DrawerContext';

const DrawerProvider = (props) => {
  const { children } = props;
  const [drawerState, setDrawerState] = useState(initialState);

  const handleUpdateState = (newState) => {
    setDrawerState((prevState) => ({
      ...prevState,
      ...newState
    }));
  };

  const handleOpenDrawer = (config) =>
    handleUpdateState({
      show: true,
      ...config
    });

  const handleCloseDrawer = () =>
    setDrawerState({
      ...initialState,
      configProps: { ...drawerState.configProps }
    });

  const contextValue = useMemo(
    () => ({
      drawerState,
      handleOpenDrawer,
      handleCloseDrawer
    }),
    [drawerState]
  );

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
};

DrawerProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { DrawerProvider };
