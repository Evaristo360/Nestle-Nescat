import React from 'react';
import { useStyles } from './ContentRelocatorStyles';

const ContentRelocator = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export { ContentRelocator };
