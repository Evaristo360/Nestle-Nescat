import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import Item from './Item';
import DragAndDropContainer from 'components/DragAndDropContainer';

const ItemsContainer = ({
  width = '100%',
  height = '40vh',
  removeItem,
  changeItems,
  labelProp,
  items = []
}) => {
  const { mode, currentTheme } = useTheme();

  const ItemComponent = (item) => (
    <Item
      index={item.id}
      data={item}
      labelProp={labelProp}
      removeItem={removeItem}
    />
  );

  return (
    <div
      css={css`
        color: ${currentTheme.texts};
        width: ${width};
        height: ${height};
        background-color: #0000001a;
        border-radius: 12px;
        overflow-y: auto;
        overflow-x: hidden;
      `}
    >
      <DragAndDropContainer
        items={items}
        handleChangeItems={changeItems}
        ItemComponent={ItemComponent}
      />
    </div>
  );
};

export default ItemsContainer;
