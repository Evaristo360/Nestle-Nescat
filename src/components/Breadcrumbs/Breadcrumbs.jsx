import _ from 'lodash';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs as BreadcrumbsMaterialUI } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { useStyles } from './BreadcrumbsStyles';

import * as helpers from './helpers';

export const Breadcrumbs = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const paths = helpers.getPaths(pathname);

  return (
    <div className={classes.container}>
      <BreadcrumbsMaterialUI aria-label="breadcrumb">
        {_.map(paths, (path, index) => (
          <Link
            key={index}
            to={helpers.getPathByPosition(paths, index)}
            className={
              _.size(paths) - 1 === index
                ? `${classes.link} ${classes.active}`
                : classes.link
            }
          >
            {path === '' && <HomeIcon className={classes.icon} />}
            {_.replace(_.upperFirst(path === '' ? 'Home' : path), '-', ' ')}
          </Link>
        ))}
      </BreadcrumbsMaterialUI>
    </div>
  );
};
