import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { css, jsx } from '@emotion/react';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { useTheme } from 'hooks/useTheme';
import Select from 'components/Selects/Select.js';
import SortIcon from 'components/Icons/SortIcon';
import CrossIcon from 'components/Icons/CrossIcon';
import CheckIcon from 'components/Icons/CheckIcon';
import { messages } from '../messages';

const ScenesTable = ({
  data = [],
  onChangeSize = (size) => {},
  pageSize,
  onEnable = (id) => {},
  onDelete = (id) => {},
  orderBy = (value) => {},
  onEdit = (id) => {},
  children
}) => {
  const intl = useIntl();
  const { currentTheme } = useTheme();
  const [showScenesOptions, setScenesOptions] = useState(null);
  const color = currentTheme.texts;

  // <td>{getDuration(data.duration)}</td>
  // <th><span onClick={() => orderBy('duration')} className="icon"><SortIcon color={color}/></span>DURACIÓN</th>

  function renderTableData(data) {
    const sceneEditLink = `/scene/edit/${data.id}`;
    const sceneDesignLink = `/scenes/design/${data.id}`;

    return (
      <tr key={data.id}>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{new Date(data.duration * 1000).toISOString().substr(11, 8)}</td>
        <td>{data.created_by_name}</td>
        <td>{data.modified_by_name}</td>
        <td>{moment(data.created_on).local().format('YYYY-MM-DD HH:mm')}</td>
        <td>{moment(data.modified_on).local().format('YYYY-MM-DD HH:mm')}</td>
        <td>
          <div className="status-icon">
            {data.is_active == 1 ? <CheckIcon /> : <CrossIcon />}
          </div>
          {data.is_active == 1
            ? intl.formatMessage(messages.yes)
            : intl.formatMessage(messages.no)}
        </td>
        <td
          className="actions"
          onClick={() =>
            setScenesOptions(showScenesOptions == data.id ? null : data.id)
          }
        >
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          {showScenesOptions == data.id ? (
            <div className="scene-options-container">
              <div className="scene-option" onClick={() => onEdit(data.id)}>
                {intl.formatMessage(messages.edit)}
              </div>
              <Link className="link" to={sceneDesignLink}>
                <div className="scene-option">
                  {intl.formatMessage(messages.design)}
                </div>
              </Link>
              <div
                onClick={
                  data.is_active == 1
                    ? () => onDelete(data.id)
                    : () => onEnable(data.id)
                }
                className="scene-option last"
              >
                {data.is_active == 1
                  ? intl.formatMessage(messages.delete)
                  : intl.formatMessage(messages.activeScene)}
              </div>
            </div>
          ) : null}
        </td>
      </tr>
    );
  }

  function getDuration(time) {
    var duration = moment.duration(time);
    var seconds = duration.seconds();
    var minutes = duration.minutes();
    var hours =
      duration.hours() +
      duration.days() * 24 +
      duration.months() * 24 * 31 +
      duration.years() * 24 * 365;

    return `${hours} : ${minutes > 9 ? minutes : `0${minutes.toString()}`} : ${
      seconds > 9 ? seconds : `0${seconds.toString()}`
    }`;
  }

  function hexaChangeRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
      return `rgb(${r}, ${g}, ${b})`;
    }
  }

  return (
    <div
      css={css`
        width: 100%;
        height: fit-content;

        .link,
        .link:hover {
          text-decoration: none;
        }

        table {
          margin-top: 13px;
          border: none;
          thead {
            // background: ${currentTheme.background};
            background: ${currentTheme.backgroundHeadTable} 0% 0% no-repeat
              padding-box;
            color: ${currentTheme.emphasis};
            // border-bottom: solid 1px ${currentTheme.titles};
            // height: 35px;
            height: 47px;
            font: normal normal medium 14px/16px Roboto;
          }
          tbody {
            tr {
              font: normal normal normal 12px/15px Verdana;
              color: ${hexaChangeRGB(currentTheme.texts, 0.5)};
            }
            tr:nth-of-type(odd) {
              background: transparent;
            }
            tr:nth-of-type(even) {
              background: ${hexaChangeRGB(currentTheme.texts, 0.05)};
            }
          }

          th,
          td {
            height: 35px;
            border-top: none;
            border-bottom: none;
            text-align: center;
            padding: 7px 3px 5px 3px;
            vertical-align: middle;
          }

          th {
            font: normal normal normal 12px/16px Verdana;
          }

          .actions {
            cursor: pointer;
            position: relative;
            padding-left: 10px;
            .circle {
              margin-top: 2px;
              margin-bottom: 2px;
              width: 6px;
              height: 6px;
              border-radius: 6px;
              background-color: ${currentTheme.titles};
            }
          }

          .scene-options-container {
            display: inline-block;
            position: absolute;
            width: 147px;
            top: 0;
            left: -150px;

            :after {
              content: '';
              position: absolute;
              left: 147px;
              top: 6px;
              width: 0;
              height: 0;
              border-top: 10px solid transparent;
              border-bottom: 10px solid transparent;
              border-left: 10px solid ${currentTheme.button};
            }
          }

          .scene-option {
            font: normal normal normal 12px/18px Verdana;
            background: ${currentTheme.button};
            color: ${currentTheme.button_Text};
            padding: 8px 5px 7px 5px;
            text-align: left;
            :hover {
              background: ${currentTheme.active_button};
              color: ${currentTheme.active_button_Text};
            }
          }
          .last {
            border-radius: 0px 0px 5px 5px;
          }
        }

        .size-label {
          font: normal normal normal 12px/15px Verdana;
          color: ${currentTheme.texts};
          opacity: 0.5;
        }

        .left-label {
          padding-right: 5px;
        }

        .right-label {
          padding-left: 6px;
        }

        .size-select {
          display: inline-block;
          width: 100%;
        }

        .icon {
          margin-right: 4px;
          cursor: pointer;
        }

        .status-icon {
          padding-left: 4px;
          display: inline-block;
        }

        .option-head {
          width: 30px;
        }
      `}
    >
      <table className="table">
        <thead>
          <tr>
            <th>
              <span onClick={() => orderBy('id')} className="icon">
                <SortIcon color={color} />
              </span>
              {intl.formatMessage(messages.id)}
            </th>
            <th>
              <span onClick={() => orderBy('name')} className="icon">
                <SortIcon color={color} />
              </span>
              {intl.formatMessage(messages.name)}
            </th>
            <th>
              <span onClick={() => orderBy('duration')} className="icon">
                <SortIcon color={color} />
              </span>
              {intl.formatMessage(messages.duration)}
            </th>
            <th>
              <span onClick={() => orderBy('created_by')} className="icon">
                <SortIcon color={color} />
              </span>
              {intl.formatMessage(messages.createdBy)}
            </th>
            <th>{intl.formatMessage(messages.modifiedBy)}</th>
            <th>{intl.formatMessage(messages.creationDate)}</th>
            <th>{intl.formatMessage(messages.modDate)}</th>
            <th>
              <span onClick={() => orderBy('is_active')} className="icon">
                <SortIcon color={color} />
              </span>
              {intl.formatMessage(messages.statusM)}
            </th>
            <th className="option-head"></th>
          </tr>
        </thead>
        <tbody>{data.map(renderTableData)}</tbody>
      </table>
      <div className="size-filter-container">
        {/* <span className="size-label left-label">
          <FormattedMessage {...messages.show} />
        </span> */}
        <br />
        <br />

        <div className="row">
          <div className="col-7"></div>
          <div className="col-4">
            <div>{children ? children : null}</div>
          </div>
          <div className="col-1">
            <div className="size-select">
              <Select
                pagination={true}
                allOptions={[
                  '10 / page',
                  '20 / page',
                  '40 / page',
                  '50 / page'
                ]}
                onSelectOption={onChangeSize}
                value={pageSize}
                name="pageSize"
              />
            </div>
          </div>
        </div>
        {/* <span className="size-label right-label">
          <FormattedMessage {...messages.elements} />
        </span> */}
      </div>
    </div>
  );
};

export default ScenesTable;
