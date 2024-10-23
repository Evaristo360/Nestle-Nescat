import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from '.';
import { Images, Pages } from 'assets';
import { useTheme } from 'hooks/useTheme';

const NestcaPageHeader = ({
  title = '',
  count = 0,
  searchItem = '',
  showCount = true,
  onChangeSearchItem,
  showGoBack = false,
  showFilterButton = false,
  onClickFilterButton = () => {},
  goBack = () => {},
  Icon = null,
  marginTop = '',
  justGoBack = false
}) => {
  const { currentTheme } = useTheme();
  const classes = useStyles({ currentTheme });

  return (
    <div className={classes.root}>
      <section className={classes.section}>
        <div className={classes.iconCont}>
          {Icon ? <img src={Icon} alt={title} /> : null}
        </div>
        <div>
          <div className={marginTop}>
            <h1 className={classes.title}>{title}</h1>
          </div>
          {showCount && <p className={classes.count}>{count}</p>}
        </div>
      </section>
      <section className={classes.section}>
        {onChangeSearchItem ? (
          <input
            className={classes.searchItem}
            type="text"
            placeholder="Buscar"
            onChange={onChangeSearchItem}
            value={searchItem}
          />
        ) : null}
        {showFilterButton ? (
          <Button onClick={onClickFilterButton} style={{}}>
            <img src={Pages.ArrowIcon} alt="Search arrow" />
            <img src={Pages.FilterIcon} alt="Search filters" />
          </Button>
        ) : null}
        {showGoBack ? (
          <Button onClick={goBack} style={{}}>
            <img src={Images.ArrowBackIcon} alt="Back" />
          </Button>
        ) : null}
        {justGoBack ? (
          <Button onClick={goBack} style={{marginLeft:'30rem'}}>
            <img src={Images.PinBackIcon} alt="Back" />
          </Button>
        ) : null}
      </section>
    </div>
  );
};

export { NestcaPageHeader };
