import _ from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import { CopyBlock, codepen } from 'react-code-blocks';
import { Container, Typography } from '@material-ui/core';
import { Accordion } from 'components/Accordion';
import { useTheme } from 'components/Theme';
import { snippets } from '../resources/snippets';
import { fileDistributionMessages } from '../FileDistribution/FileDistributionMessages';
import { codeExamplesMessages } from './CodeExamplesMessages';
import { useStyles } from './CodeExamplesStyles';

const CodeExamples = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { theme } = useTheme();

  const getTranslation = (findMessage) => {
    const message = _.get(codeExamplesMessages, findMessage);

    if (message) return intl.formatMessage(message);

    return findMessage;
  };

  const examples = [];

  _.forEach(snippets, (snippet, key) => {
    const codeSnippets = _.map(snippet, (item) => ({
      title: getTranslation(item.title),
      content: (
        <div className={classes.codeBlock}>
          <CopyBlock
            text={item.code}
            language="jsx"
            showLineNumbers
            theme={codepen}
            codeBlock
          />
        </div>
      )
    }));

    examples.push({
      name: key,
      snippets: codeSnippets
    });
  });

  return (
    <Container className={classes.container}>
      {_.map(examples, (example, index) => (
        <div className={classes.example} key={`${example.name}-${index}`}>
          <Typography variant="h2">{_.upperFirst(example.name)}</Typography>

          <Typography variant="body1" className={classes.description}>
            {intl.formatMessage(fileDistributionMessages[example.name], {
              br: ''
            })}
          </Typography>

          <Accordion
            className={theme === 'light' ? classes.accordion : undefined}
            items={example.snippets}
          />
        </div>
      ))}
    </Container>
  );
};

export { CodeExamples };
