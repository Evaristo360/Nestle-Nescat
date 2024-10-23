import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { previewSurveyStyle } from './styles';
import useSurvey from '../AnswerSurvey/hooks/useSurvey';
import useErrorDictionary from '../SignInPage/hooks/useErrorDictionary';
import PageHeader from '../../components/PageHeader';
import Survey from '../../components/SurveyView/Survey/Survey';
import Toggle from './components/Toggle';
import CancelOkModal from '../../components/CancelOkModal';
import { getMsg } from './messages';

function PreviewSurvey({ location, history }) {
  const [showModal, setShowModal] = useState(false);
  const { push } = history;
  const state = _.get(location, 'state', {});
  const [error, updateErrorStatus] = useState(null);
  const [isShowAllOptionSelected, updateTypeOptionStatus] = useState(false);
  const { surveyData, getSurveyData, getSurveyDataFromCreate } = useSurvey(
    updateErrorStatus
  );

  if (!state) push('/surveys/list');

  useEffect(() => {
    if (state.fromCreate) {
      getSurveyDataFromCreate(state);
    } else {
      getSurveyData(state);
    }
  }, [0]);

  const redirect = state.fromCreate
    ? `/survey/create`
    : `/survey/edit/${state.id}`;

  return (
    <div css={previewSurveyStyle()}>
      <PageHeader title="Vista previa encuesta" to={redirect} />

      <div className="sas-survey-preview--options">
        <div className="sas-survey-preview--toggle-container">
          <p>Vista por pregunta:</p>
          <Toggle
            isChecked={isShowAllOptionSelected}
            onChange={() => updateTypeOptionStatus((prevState) => !prevState)}
          />
        </div>
      </div>

      <div className="sas-survey-preview--container">
        {!error ? (
          <Survey
            surveyConfig={{
              ...surveyData,
              type: isShowAllOptionSelected ? 'all_question' : 'one_question'
            }}
            onSendAnswers={(d) => {
              setShowModal(true);
            }}
          />
        ) : (
          <h1>{useErrorDictionary(error)}</h1>
        )}
        {showModal ? (
          <CancelOkModal
            onAccept={() => history.goBack()}
            onCancel={null}
            title={getMsg('endPreviewTitle')}
            text={getMsg('endPreviewText')}
          />
        ) : null}
      </div>
    </div>
  );
}

export default PreviewSurvey;
