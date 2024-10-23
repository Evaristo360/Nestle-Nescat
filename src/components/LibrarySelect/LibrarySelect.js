import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import hexToRGB from 'components/utils/hexToRBG';
import arrowSelect from 'components/Images/arrowselect1.svg';
import searchIcon from 'components/Images/search.svg';
import useAxios from 'hooks/useAxios';

const LibrarySelect = ({
  library,
  selected,
  onSelect,
  searchBar,
  setActualImageID,
  setLibrary
}) => {
  const { get } = useAxios();
  const { currentTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const ListStyle = css`
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 157px;
    font: normal normal normal 12px/15px Verdana;
    position: relative;
    z-index: 2000;
    width:100%;
    li {
      margin: 0;
      padding: 0;
      width: 100%;
      height: auto;
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
      height: 100px;
      overflow-y: auto;
      overflow-x: hidden;
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

  const handleSelectImage = (e) => {
    onSelect(e.name);
    setActualImageID(e);
    setShowOptions(false);
    async function fetchMyAPI() {
      let response = await get('/advertisements?type=image');

      setLibrary(response.data.result.items);
    }

    fetchMyAPI();
  };

  const requestNewOptions = (e) => {
    async function fetchMyAPI() {
      let response = await get(
        `/advertisements?type=image&search_item=${e.target.value}`
      );

      setLibrary(response.data.result.items);
    }

    fetchMyAPI();
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
            {searchBar ? (
              <>
                <li id="searchBar">
                  <input
                    type="search"
                    name="fname"
                    id="search"
                    placeholder={'Buscar...'}
                    onChange={requestNewOptions}
                  />
                </li>

                {library.map((e, index) => (
                  <li key={index} onClick={() => handleSelectImage(e)}>
                    {e.name}
                  </li>
                ))}
              </>
            ) : (
              <>
                {library.map((e, index) => (
                  <li key={index} onClick={() => handleSelect(e)}>
                    {e}
                  </li>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </ul>
  );
};

export default LibrarySelect;
