import { createContext } from 'react';

export const initialState = {
  show: false,
  title: null,
  body: null,
  closeButton: null,
  isDismissible: true,
  configProps: {
    anchor: 'left',
    variant: 'temporary', // oneOf ['permanent','persistent','temporary']
    transitionDuration: 500,
    className: null
  }
};

export const DrawerContext = createContext();
