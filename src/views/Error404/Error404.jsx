import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Container, Typography, Button } from '@material-ui/core';
import { messages } from './messages';
import './Error404.scss';

function Error404() {
  const history = useHistory();
  const handleNavigateToHome = () => history.push('/');

  return (
    <Container className="container-not-found" maxWidth="xl">
      <div>
        <Typography variant="h1">404</Typography>
        <Typography variant="h5" color="secondary">
          <FormattedMessage {...messages.title} />
        </Typography>
        <Typography component="p" variant="subtitle2">
          <FormattedMessage {...messages.description} />
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleNavigateToHome}
        >
          <FormattedMessage {...messages.button} />
        </Button>
      </div>
    </Container>
  );
}

export { Error404 };
