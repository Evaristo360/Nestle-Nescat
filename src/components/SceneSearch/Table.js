import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import AddIcon from '../../assets/icons/add.svg';
import SvgIcon from '../SvgIcon';
import Select from '../../components/Selects/Select.js';
import { useIntl } from 'react-intl';
import { messages } from './messages';

const Table = ({ data, addItem, onChangeSize, pageSize }) => {
  const { currentTheme } = useTheme();

  const intl = useIntl();

  return (
    <div
      css={css`
        table {
          width: 100%;
          tbody {
            max-height: 42vh;
            display: block;
            overflow: auto;
            tr {
              height: 38px;
            }
          }
          ,
          thead,
          tbody tr {
            display: table;
            width: 100%;
            table-layout: fixed;
          }
        }
        .icon {
          cursor: pointer;
        }
      `}
    >
      <div className="row mt-3 ml-1">
        <span>{intl.formatMessage(messages.display)}</span>
        <div className="mt-1">
          <Select
            allOptions={[10, 20, 30, 40]}
            onSelectOption={onChangeSize}
            value={pageSize}
          />
        </div>
        <span>{intl.formatMessage(messages.elements)}</span>
      </div>
      <table className="mt-2">
        <thead>
          <tr>
            <th>{intl.formatMessage(messages.id)}</th>
            <th>{intl.formatMessage(messages.name)}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((scene) => (
            <tr key={scene.id}>
              <td>{scene.id}</td>
              <td>{scene.name}</td>
              <td>
                <SvgIcon
                  src={AddIcon}
                  color={currentTheme.emphasis}
                  width={18}
                  height={18}
                  className="icon"
                  onClick={() => addItem(scene)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
