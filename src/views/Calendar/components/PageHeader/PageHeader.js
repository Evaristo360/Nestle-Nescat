import React from 'react';
import { useStyles } from '.';
import SearchSelect from '../SearchSelect';
import { SelectV2, createOption } from 'components/SelectV2';
import { Button } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { useTheme } from 'hooks/useTheme';

const PageHeader = ({
  title,
  count,
  searchItem = '',
  onChangeSearchItem,
  Icon,
  searchSelect_items,
  searchSelect_onChange,
  searchSelect_searchItems,
  searchSelect_value,
  searchSelect_placeHolder,
  searchSelect_multiple,
  searchSelect_removeItem
}) => {
  const { currentTheme } = useTheme();
  const classes = useStyles({ currentTheme });

  const onChange = (event) => {
    const index = event.target.value;

    if (index === 0) return;
    let item = searchSelect_items[index - 1];
    let itemExists = searchSelect_value.find((it) => it.id === item.id);

    if (!itemExists) {
      searchSelect_onChange([...searchSelect_value, item]);
    }
  };

  const getOptions = () => {
    const options = [
      { name: 'Selecciona una pantalla' },
      ...searchSelect_items
    ];

    return options.map((item, index) => createOption(item.name, index));
  };

  const removeScreen = (screen) => {
    const id = screen.id;
    let newScreens = searchSelect_value.slice();
    searchSelect_onChange(newScreens.filter((sc) => sc.id !== id));
  };

  return (
    <div className={classes.root}>
      <section className={classes.section}>
        <div className={classes.iconCont}>
          {Icon ? <img src={Icon} alt={title} /> : null}
        </div>
        <div>
          <div className="mt-2">
            <h1 className={classes.title}>{title}</h1>
          </div>
          <p className={classes.count}>{count}</p>
        </div>
      </section>
      <section className={classes.section}>
        <div className={classes.screensSelected}>
          {(searchSelect_value || []).map((item, index) => (
            <Button
              onClick={() => removeScreen(item)}
              key={index}
              className={classes.screenBtn}
            >
              {item.name}
              <RemoveCircleOutlineIcon size="small" />
            </Button>
          ))}
        </div>
        <SelectV2
          id="select-screen"
          label="Pantalla"
          value={0}
          onChange={onChange}
          options={getOptions()}
          labelClassName={classes.lblPosition}
          className={classes.textPosition}
        />
      </section>
    </div>
  );
};

export { PageHeader };
