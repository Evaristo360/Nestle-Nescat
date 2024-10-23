import { css } from "@emotion/react";
import {normalStylesItem, styles, selectedStylesItem } from './RadioRowStyles'
import { useTheme } from "hooks/useTheme";

export const CheckBox = ({ items, name, value, onChange, className, style }) => {

  const handleChange = (item) => {
    if (onChange) {
      onChange({ [name]: item.value });
    }
  };

  const getStylesItem = (it) => {
    if (it.value === value) {
      return css`
        ${normalStylesItem} ${selectedStylesItem}
      `;
    }
    return normalStylesItem;
  };

  return (
    <div css={styles} className={className} style={style}>
      {items.map((it, index) => (
        <div className="checkbox-item" key={index} css={getStylesItem(it)}>
          <button className="point-ext" onClick={() => handleChange(it)}>
            <div className="point"></div>
          </button>
          <div>
            <span>{it.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
