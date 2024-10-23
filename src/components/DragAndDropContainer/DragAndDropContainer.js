import React from 'react';
import { css } from '@emotion/react';

const styles = css`
  width: 100%;
  .dnd-item {
    width: 100%;
  }
`;

const DragAndDropItem = ({ id, onDragStart, children, style, className }) => (
  <div
    style={style}
    className={className}
    onDragStart={(e) => onDragStart(e, id)}
    draggable
  >
    {children}
  </div>
);

export const DragAndDropContainer = ({
  style,
  className,
  styleItem,
  classNameItem,
  items,
  handleChangeItems,
  ItemComponent
}) => {
  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (event, slotIndex) => {
    let slots = items;
    let sourceIndex = parseInt(event.dataTransfer.getData('sourceIndex'));

    if (sourceIndex == slotIndex) return;

    let slotMoved = { ...slots[sourceIndex] };
    let newSlots = [];

    if (slotIndex < sourceIndex) {
      newSlots = newSlots.concat(slots.slice(0, slotIndex));
      newSlots.push(slotMoved);
      newSlots = newSlots
        .concat(slots.slice(slotIndex, sourceIndex))
        .concat(slots.slice(sourceIndex + 1));
    } else if (sourceIndex < slotIndex) {
      newSlots = newSlots
        .concat(slots.slice(0, sourceIndex))
        .concat(slots.slice(sourceIndex + 1, slotIndex + 1));
      newSlots.push(slotMoved);
      newSlots = newSlots.concat(slots.slice(slotIndex + 1));
    }

    if (handleChangeItems) {
      handleChangeItems({
        prevIndex: sourceIndex,
        nextIndex: slotIndex,
        newItems: newSlots
      });
    }
  };

  const onDragStart = (event, sourceIndex) => {
    event.dataTransfer.setData('sourceIndex', sourceIndex);
  };

  return (
    <div style={style} className={className} css={styles}>
      {items.map((it, index) => (
        <div
          className="dnd-item"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, index)}
          key={index}
        >
          <DragAndDropItem
            key={index}
            id={index}
            onDragStart={onDragStart}
            style={styleItem}
            className={classNameItem}
          >
            <ItemComponent key={it.id} {...it} arrayIndex={index} />
          </DragAndDropItem>
        </div>
      ))}
    </div>
  );
};
