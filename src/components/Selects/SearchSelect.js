import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import SvgIcon from '../../components/SvgIcon';
import DeleteItemIcon from '../../assets/icons/remove-circle-outline.svg';

const SearchSelect = ({
  value,
  onChange,
  items = [],
  placeHolder,
  labelProp,
  searchItems,
  loading,
  search = true,
  width = '100%',
  multiple = false,
  removeItem = () => {}
}) => {
  const { mode, currentTheme } = useTheme();
  const [optionsVisibled, updateOptionsStatus] = useState(false);

  function onClickOption(e) {
    if (onChange) {
      const element = JSON.parse(e.currentTarget.dataset.value);

      if (multiple) {
        if (!value.find((v) => v.id === element.id)) {
          value.push(element);
          onChange([...value]);
        }
      } else {
        onChange(element);
      }
    }

    updateOptionsStatus(false);
  }

  return (
    <div
      css={css`
        width: ${width};
        position: relative;
        height: 100px;
        max-width: 800px;
        .input {
          width: 100%;
          height: 100px;
          display: ${multiple ? 'flex' : 'block'};
          justify-content: ${multiple ? 'flex-end' : 'none'};
        }
        .select-value {
          padding-right: 5px;
          font-size: 12px;
          color: ${currentTheme.texts};
          opacity: 0.5;
        }
        .selected-items {
          float: left;
          width: calc(100%- 120px);
          display: flex;
          overflow-x: hidden;
          font-size: 14px;
          &:hover {
            overflow-x: auto;
          }
          div {
            min-width: 150px;
            height: 100px;
            line-height: 100px;
            margin-right: 5px;
            overflow: hidden;

            background-color: ${mode == 'dark' ? '#181818' : '#f5f5f5'};
            border-radius: 8px;
            position: relative;
            opacity: 0.6;
            cursor: pointer;
            .icon {
              min-width: auto;
              height: 100px;
              width: 22px;
              position: absolute;
              top: 2px;
              left: 2px;
              z-index: 5;
              background-color: ${currentTheme.emphasis};
            }
            span {
              color: ${currentTheme.texts};
              margin-left: 32px;
            }
          }
        }
        input {
          padding-right: 5px;
          padding-left: 8px;
          font-size: 12px;
          background: ${currentTheme.background};
          color: ${currentTheme.texts};
          border: none;
          width: ${multiple ? '110px' : '95%'};
          opacity: 0.5;
          &:focus {
            border-bottom: 1px solid ${currentTheme.emphasis};
            background: ${currentTheme.background};
            box-shadow: none;
            outline: none;
            opacity: 1;
            color: ${currentTheme.texts};
          }
        }

        .options-container {
          width: 100%;
          position: absolute;
          top: 32px;
          z-index: 5;
          padding-top: 6px;
        }

        .option {
          display: flex;
          justify-content: ${multiple ? 'flex-end' : 'flex-start'};
          color: ${currentTheme.texts};
          background: ${currentTheme.background};
          padding-left: 7px;
          padding-right: 7px;
          font-size: 12px;
          width: 100%;
          transition: width 0.5s;
          cursor: pointer;
          :hover {
            background: ${currentTheme.button};
            color: ${currentTheme.button_Text};
            border-radius: 5px;
          }
        }

        .icon-container {
          float: right;
          margin-right: 5px;
        }

        .select-icon {
          fill: ${currentTheme.titles};
        }
      `}
    >
      <div
        className="input"
        onClick={() => {
          if (!search) {
            updateOptionsStatus(true);
          }
        }}
      >
        {multiple && (
          <div className="selected-items">
            {value.map((item, index) => (
              <div key={index}>
                <SvgIcon
                  src={DeleteItemIcon}
                  color={currentTheme.emphasis}
                  width={12}
                  height={12}
                  className="icon"
                  onClick={() => removeItem(item)}
                />
                <span>{item[labelProp]}</span>
              </div>
            ))}
          </div>
        )}
        <input
          placeholder={placeHolder}
          value={(value || {})[labelProp]}
          onFocus={() => {
            updateOptionsStatus(true);
            if (multiple === false) {
              onChange(null);
            }
          }}
          readOnly={!search}
          onKeyUp={(e) => {
            if (e.key === 'Enter' && searchItems) {
              searchItems(e.target.value);
            }
          }}
        />
        {loading && (
          <div class="clearfix">
            <div class="spinner-border float-right" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <div className="icon-container">
          <svg
            className="select-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="7"
            viewBox="0 0 11 7"
          >
            <g transform="translate(0)">
              <path
                className="a"
                d="M8.1,11.6,2.6,6.041,4.026,4.6,8.1,8.718,12.174,4.6,13.6,6.041Z"
                transform="translate(-2.6 -4.6)"
              />
            </g>
          </svg>
        </div>
      </div>
      {optionsVisibled && items.length > 0 && (
        <div className="options-container">
          {items.map((option, i) => (
            <div
              key={i}
              onClick={onClickOption}
              className="option"
              data-value={JSON.stringify(option)}
            >
              {option[labelProp]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
