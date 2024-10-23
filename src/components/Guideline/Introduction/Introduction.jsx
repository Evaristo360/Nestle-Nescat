import React, { useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { Box, Container, Typography, Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Images } from 'assets';
import { useModal } from 'components/Modal';
import { useLoader } from 'components/Loader';
import { messages } from './IntroductionMessages';
import './Introduction.scss';

const Introduction = () => {
  const history = useHistory();
  const intl = useIntl();
  const { handleShowLoader } = useLoader();
  const { handleOpenModal } = useModal();
  const pharagrapTranslated = intl.formatMessage(messages.motivationContent, {
    br: <br />
  });

  useEffect(() => {
    // Example to use loader
    handleShowLoader(true);

    setTimeout(() => {
      handleShowLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      <Container className="introduction-container">
        <div className="title">
          <img src={Images.logo} className="title__logo" alt="logo" />
          <Typography variant="h1">
            <FormattedMessage {...messages.title} />
          </Typography>
        </div>

        <Typography variant="body1" component="p">
          <FormattedMessage {...messages.aboutHooks} />
        </Typography>

        <Typography variant="h3">
          <FormattedMessage {...messages.motivationSubtitle} />{' '}
          <span role="img" aria-label="clap">
            👏
          </span>
        </Typography>

        <Typography variant="body1">{pharagrapTranslated}</Typography>

        <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push('/guideline/file-distribution')}
            >
              {intl.formatMessage(messages.buttonFilesDistribution)}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push('/guideline/code-examples')}
            >
              {intl.formatMessage(messages.buttonExamples)}
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                handleOpenModal({
                  body: (
                    <Box p={4}>
                      <div className="title">
                        <img
                          src={Images.logo}
                          className="title__logo"
                          alt="logo"
                        />
                        <Typography variant="h1">
                          <FormattedMessage {...messages.title} />
                        </Typography>
                      </div>
                    </Box>
                  )
                })
              }
            >
              {intl.formatMessage(messages.buttonOpenModal)}
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push('incorrect-path')}
            >
              {intl.formatMessage(messages.buttonExampleNotFound)}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export { Introduction };
