import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
//import Table from './Table';
import Table from '../Table';
import { useTable } from 'hooks/useTableV2';
import SearchInput from 'components/Inputs/ListFiltersInputs/SearchInput';
import { useIntl } from 'react-intl';
import { messages } from './messages';
import { Button } from '@material-ui/core';
import { CampaignIcons } from 'assets';
import { OrderByButton } from 'components/OrderByButton';

export const SceneSearch = ({ width = '100%', height = '100%', addItem }) => {
  //const [scenes, updateScenes, totalScenes, filters] = useGetScenes();

  const { mode, currentTheme } = useTheme();
  const intl = useIntl();
  const {
    onChangeSearchItem,
    onChangeSize,
    onChangePage,
    totalFound,
    page,
    pageSize,
    searchItem,
    items,
    search,
    setOrderBy
  } = useTable({ endpoint: '/scene' });

  return (
    <div
      css={css`
        color: ${currentTheme.texts};
        width: ${width};
        height: ${height};
        background-color: #ffffff;
        border-radius: 12px;
        padding: 20px;
        .scene-list-label {
          color: #007cba;
          font: normal normal normal 14px/19px Roboto;
          margin-bottom: 1.3rem;
        }
        .scene-search-label {
          color: #63513d;
          margin-bottom: 1rem;
          font: normal normal medium 16px/21px Roboto;
        }
      `}
    >
      <div className="search-container">
        <p className="scene-list-label">Listado de escenas</p>
        <p className="scene-search-label">Búsqueda</p>
        <SearchInput
          placeholder="Buscar"
          name="search"
          value={searchItem}
          onChange={onChangeSearchItem}
        />
      </div>
      <Table
        total={totalFound}
        page={page}
        pageSize={pageSize}
        onChangeSize={onChangeSize}
        onChangePage={onChangePage}
      >
        <thead>
          <tr>
            <th>
              <OrderByButton onClick={() => setOrderBy('id')}>ID</OrderByButton>
            </th>
            <th>
              <OrderByButton onClick={() => setOrderBy('name')}>
                Nombre
              </OrderByButton>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <Button onClick={() => addItem(item)}>
                  <img src={CampaignIcons.CampaignAddIcon} alt="Add" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
