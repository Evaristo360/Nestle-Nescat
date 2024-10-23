import React from 'react';
import { Modal } from '@material-ui/core';
import Input from 'components/Inputs/Input';
import ItemsContainer from 'components/ItemsContainer';
import SceneSearch from 'components/SceneSearch';
import { CampaignCreateStyle } from './CampaignCreate.css';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import useCampaign from '../hooks/useCampaign';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { messages } from '../messages';
import { useIntl } from 'react-intl';

export const CampaignCreate = () => {
  const [
    campaignName,
    canUpdate,
    scenes,
    removeScene,
    changeScenes,
    addScene,
    campaignNameUpdate,
    actionCampaign,
    loading,
    successSaved,
    updateAlertVisible,
    id
  ] = useCampaign();
  const history = useHistory();
  const goBack = () => history.push('/campaigns/list');
  const intl = useIntl();

  if (successSaved) {
    goBack();

    return null;
  }

  return (
    <Modal open={true} onClose={goBack} style={{ padding: '2rem' }}>
      <section css={CampaignCreateStyle()}>
        <header className="header">
          <h1 className="title">
            {intl.formatMessage(
              id ? messages.editCampaign : messages.addCampaign
            )}
          </h1>
        </header>
        <div className="content">
          <div className="row">
            <div className="col">
              <div className="subtitle">
                <FormattedMessage {...messages.campaignData} />
              </div>
              <form className="form">
                <FormattedMessage {...messages.campaignName}>
                  {(name) => (
                    <FormattedMessage {...messages.campaignNamePH}>
                      {(namePH) => (
                        <Input
                          label={namePH}
                          placeholder={name}
                          value={campaignName}
                          onChange={(e) => campaignNameUpdate(e.target.value)}
                          maxLength={50}
                          name="name"
                        />
                      )}
                    </FormattedMessage>
                  )}
                </FormattedMessage>
              </form>
              <div className="emphasis mb-2">
                <FormattedMessage {...messages.relatedScenes} />
              </div>
              <ItemsContainer
                removeItem={removeScene}
                items={scenes}
                labelProp="name"
                changeItems={changeScenes}
              />
              <div className="row mt-3 text-center">
                <div className="col">
                  <Button
                    disabled={!canUpdate || loading}
                    onClick={actionCampaign}
                  >
                    <FormattedMessage {...messages.saveCampaign} />
                  </Button>
                </div>
                <div className="col">
                  <Link to="/campaigns/list" className="link-back">
                    <Button>
                      <FormattedMessage {...messages.cancel} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col">
              <SceneSearch addItem={addScene} />
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
};
