import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useIntl } from 'react-intl';
import { messages } from '../../messages';

const SurveyItem = ({
  properties,
  openDeleteModal,
  showSurveyOptionsID,
  setShowSurveysOptionsID
}) => {
  const intl = useIntl();
  const [showSurveyOptions, setShowSurveyOptions] = useState(false);
  let editLink = `/campaign/edit/${properties.id}`;
  let previewLink = `/campaign/preview/${properties.id}`;

  moment.locale();
  let campLen;

  if (typeof properties.scene_ids == 'undefined') {
  } else {
    campLen = properties.scene_ids.length;
  }

  return (
    <tr className="inside">
      <td className="iniHead">{properties.name}</td>

      <td>{campLen}</td>
      <td>
        {properties.duration}
        {intl.formatMessage(messages.seconds)}
      </td>

      <td
        id="circles"
        onClick={() =>
          showSurveyOptionsID == properties.id
            ? setShowSurveysOptionsID()
            : setShowSurveysOptionsID(properties.id)
        }
      >
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        {showSurveyOptionsID == properties.id ? (
          <>
            <div id="surveyOptions">
              <ul>
                <Link to={editLink}>
                  <li>{intl.formatMessage(messages.editItem)}</li>
                </Link>
                <li onClick={() => openDeleteModal(properties.id)}>
                  {intl.formatMessage(messages.deleteItem)}
                </li>
                <Link to={previewLink}>
                  <li>{intl.formatMessage(messages.previewItem)}</li>
                </Link>
              </ul>
            </div>
            <div id="triangle"></div>
          </>
        ) : null}
      </td>
    </tr>
  );
};

export default SurveyItem;
