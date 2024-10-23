import React from 'react';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export const createContextMenuItem = (id, label) => ({ id, label });

const ContextMenu = ({
  TriggerComponent,
  TriggerComponentProps,
  items,
  onClickItem
}) => {
  const handleClick = (id, popupState) => {
    if (onClickItem) onClickItem(id);
    popupState.close();
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <TriggerComponent
            {...TriggerComponentProps}
            {...bindTrigger(popupState)}
          />
          <Menu {...bindMenu(popupState)}>
            {items.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => handleClick(item.id, popupState)}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export { ContextMenu };
