import React from 'react';
import { css } from '@emotion/react';
import { Select, MenuItem } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { tableConfig } from 'providers/tableConfig';

export const Pagination = ({
  page = 1,
  pageSize = tableConfig.pageSize,
  total = 0,
  onChangePage = (page) => {},
  onChangeSize = (size) => {}
}) => {
  return (
    <div className="pagination-container">
      {total ? (
        <label className="pages-info">
          Mostrando {(page - 1) * pageSize + 1} -{' '}
          {page * pageSize < total ? page * pageSize : total} de {total}
          elementos
        </label>
      ) : (
        <label className="pages-info" htmlFor="pages-info">
          No se encontraron resultados
        </label>
      )}
      <div className="pagination-components">
        <Pagination
          className="pagination"
          count={Math.max(Math.ceil(total / pageSize), 1)}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(event, page) => onChangePage(page)}
        />
        <Select
          className="select-page-size"
          id="page-size"
          size="small"
          value={pageSize}
          onChange={(event) => onChangeSize(event.target.value)}
          variant="outlined"
        >
          {filters.map((op) => (
            <MenuItem
              value={op}
              key={op}
            >{`${op} / ${tableConfig.pageLabel}`}</MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
