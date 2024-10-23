import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import hexToRGB from '../components/utils/hexToRBG';
import arrowSelect from './Images/arrowselect1.svg';
import searchIcon from './Images/search.svg';

const SelectWithBackground = ({
  library,
  selected,
  onSelect,
  searchBar,
  width
}) => {
  const { currentTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const ListStyle = css`
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: ${width};
    font: normal normal normal 12px/15px Verdana;
    position: relative;
    li {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      color: ${hexToRGB(currentTheme.texts, 0.5)};
      background-color: ${currentTheme.background};
      position: relative;
      padding: 7px 14px 7px 14px;
      cursor: pointer;
      transition: 0.2s;
      img {
        position: absolute;
        right: 10px;
        top: 12px;
      }
      #search {
        border: none;
        padding-bottom: 7px;
        background-image: none;
        font-size: 12px;
        background-color: transparent;
      }
      input#search {
        background-image: url(${searchIcon});
        background-size: 20px;
        background-repeat: no-repeat;
        text-indent: 23px;
        outline: none;
        color: ${currentTheme.texts};
      }
      input#search:focus {
        background-image: none;
        text-indent: 0px;
        color: ${currentTheme.texts};
      }
    }
    #firstLi {
      border-radius: 5px;
    }
    #floatdiv {
      position: absolute;
      width: 100%;
    }
    #searchBar {
      border-bottom: 1px;
      border-bottom-style: solid;
      border-bottom-color: #00ffee;
      :hover {
        background-color: ${currentTheme.button};
        color: ${currentTheme.button_Text};
      }
    }

    li:hover {
      background-color: ${currentTheme.button};
      color: ${currentTheme.button_Text};
    }
  `;
  const handleSelect = (e) => {
    onSelect(e);
    setShowOptions(false);
  };

  return (
    <ul css={ListStyle}>
      <li id="firstLi" onClick={() => setShowOptions(!showOptions)}>
        {selected}
        <img src={arrowSelect} alt="" />
      </li>

      {showOptions && (
        <>
          <div id="floatdiv">
            {searchBar && (
              <li id="searchBar">
                <input
                  type="search"
                  name="fname"
                  id="search"
                  placeholder={'Buscar...'}
                />
              </li>
            )}

            {library.map((e) => (
              <li key={e} onClick={() => handleSelect(e)}>
                {e}
              </li>
            ))}
          </div>
        </>
      )}
    </ul>
  );
};

export default SelectWithBackground;
