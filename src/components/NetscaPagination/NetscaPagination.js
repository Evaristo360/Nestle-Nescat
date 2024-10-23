import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import { Select, MenuItem } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { tableConfig } from 'providers/tableConfig';

const NetscaPagination = ({
  filters = tableConfig.pageSizes,
  scroll_X = false,
  total = 50,
  page = 1,
  pageSize = 10,
  onChangeSize = (size) => {},
  onChangePage = (page) => {},
  children,
  className,
  style
}) => {
  const { currentTheme } = useTheme();

  return (
    <div
      css={css`
        width: 100%;
        height: fit-content;
        margin-bottom: 1.5rem;

        .link,
        .link:hover {
          text-decoration: none;
        }

        .page {
          display: flex;
          flex-direction: column;
        }

        table {
          margin-top: 13px;
          border: none;
          thead {
            background: #007cba0a;
            color: #63513d;
            height: 35px;
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
          tbody {
            tr {
              font: normal normal normal 12px/15px Roboto;
              color: #1c1c1c;
              border-bottom: 1px solid #cbcbcb;
            }
          }

          th,
          td {
            height: 35px;
            border-top: none;
            border-bottom: none;
            text-align: center;
            padding: 15px 3px 15px 3px;
            vertical-align: middle;
          }

          th {
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            font-size: 0.875rem;
            font-weight: 500;    
            letter-spacing: 0.02857em;
            color: rgba(0, 0, 0, 0.87);
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
        }

        .pagination-container {
          display: flex;
          justify-content: space-between;
          align-items: end;
          margin-top: 65px;
          color: #1c1c1c;
          margin-right: 3rem;
          margin-left: 3rem;
        }
        .pages-info {
          color: ${currentTheme.table_pagination_text};;
        }
        .pagination-components {
          display: flex;
        }
        .pagination {
          margin-right: 1rem;
        }
        #page-size {
          padding-top: 0.2rem;
          padding-bottom: 0.2rem;
        }
        .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
          border-color: gray;
        }
        .MuiPagination-root {
          button.Mui-selected {
            background: #1c1c1c;
            color: white;
          }
        }
        .MuiButtonBase-root {
          background: #FFFFFF;
        }
        .MuiPaginationItem-root {
          background: #FFFFFF;
        }
        .MuiInputBase-root {
          background: #FFFFFF;
        }
        table {
          width: 100%;
        }

        ${scroll_X 
          ? 
            'table{display: block; overflow-x: auto; white-space: nowrap;}'+
            'th,td {min-width: 130px!important; max-width: 200px!important; white-space: break-spaces;padding: 15px!important;}' 
          : 
          ""}
      `}
    >
      <div className="page">
      <div className={`${className}`} style={style}>
        {children}
      </div>
      <div className="pagination-container">
        {total ? (
          <label className="pages-info">
            Mostrando {(page - 1) * pageSize + 1} -{' '}
            {page * pageSize < total ? page * pageSize : total} de {total}{' '}
            elementos{' '}
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
              <MenuItem value={op} key={op}>{`${op} / ${tableConfig.pageLabel}`}</MenuItem>
            ))}
          </Select>
        </div>
      </div>
      </div>
    </div>
  );
};

export default NetscaPagination;
