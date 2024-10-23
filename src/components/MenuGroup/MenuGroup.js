import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStyles } from './MenuGroupStyles';

const MenuGroup = ({ label = '', items = [], onClick }) => {
  const { pathname } = useLocation();
  const classes = useStyles();

  const getLinkClassName = (path) => {
    if (path === pathname) {
      return [classes.link, classes.linkActive].join(' ');
    }

    return classes.link;
  };

  if (items.length === 0) return null;

  return (
    <div className={classes.root}>
      <p className={classes.groupName}>{label}</p>
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.route}
          className={getLinkClassName(item.route)}
          onClick={onClick}
        >
          {item.icon ? (
            <div className={classes.iconContainer}>
              <img src={item.icon} alt={item.label} className={classes.icon} />
            </div>
          ) : null}
          <p>{item.label}</p>
        </Link>
      ))}
    </div>
  );
};

export { MenuGroup };
