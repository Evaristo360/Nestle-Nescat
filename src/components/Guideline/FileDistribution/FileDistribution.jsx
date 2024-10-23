/* eslint-disable no-useless-escape */
import _ from 'lodash';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { CopyBlock, codepen } from 'react-code-blocks';
import { Box, Container, Typography, Divider, Fade } from '@material-ui/core';
import { Code as CodeIcon } from '@material-ui/icons';
import { TreeView } from 'components/TreeView';
import { Accordion } from 'components/Accordion';
import { useTheme } from 'components/Theme';
import files from '../resources/files.json';
import { snippets } from '../resources/snippets';
import { codeExamplesMessages } from '../CodeExamples/CodeExamplesMessages';
import { getIconByExtension } from './helpers';
import { fileDistributionMessages } from './FileDistributionMessages';
import { useStyles } from './FileDistributionStyles';

const FileDistribution = () => {
  const intl = useIntl();
  const classes = useStyles();
  const { theme } = useTheme();
  const [fileName, setFileName] = useState('src');

  const [name, extension] = _.split(fileName, '.');
  const icon = getIconByExtension(extension);
  const [, sufix] = _.split(_.snakeCase(name), '_');

  const priorityName = !sufix ? extension || fileName : sufix;
  const descriptionMessage = _.get(fileDistributionMessages, priorityName);
  const description = descriptionMessage
    ? intl.formatMessage(descriptionMessage, { br: <br /> })
    : '';
  const fileExamples = _.get(snippets, priorityName, []);

  const getExampleTitle = (findMessage) => {
    const message = _.get(codeExamplesMessages, findMessage);

    if (message) return intl.formatMessage(message);

    return findMessage;
  };

  const codeExamples = _.map(fileExamples, (example, index) => ({
    title: `0${index + 1} - ${getExampleTitle(example.title)}`,
    content: (
      <div className={classes.codeBlock}>
        <CopyBlock
          text={example.code}
          language="jsx"
          showLineNumbers
          theme={codepen}
          codeBlock
        />
      </div>
    )
  }));

  const hasSourceCode = _.size(codeExamples) > 0;

  return (
    <Container className={classes.container}>
      <div className={classes.headerSection}>
        <Typography variant="h2">
          {intl.formatMessage(fileDistributionMessages.title)}
        </Typography>
        <Typography variant="body1">
          {intl.formatMessage(fileDistributionMessages.summary, { br: <br /> })}
        </Typography>
      </div>

      {fileName && (
        <Box py={1} textAlign="justify">
          <Box mt={4} display="flex" alignItems="center">
            <img src={icon} alt="file-icon" className={classes.iconFile} />
            <Typography variant="h2" className={classes.fileName}>
              {fileName}
            </Typography>
          </Box>

          <Typography variant="body1" className={classes.description}>
            {description}
          </Typography>

          <Fade in={hasSourceCode}>
            <Box py={1}>
              <Typography variant="body1" className={classes.subtitle}>
                <CodeIcon color="primary" fontSize="large" />{' '}
                {intl.formatMessage(fileDistributionMessages.sourceCodeLabel)}
              </Typography>

              <Accordion
                className={theme === 'light' ? classes.accordion : undefined}
                items={codeExamples}
              />
            </Box>
          </Fade>
        </Box>
      )}

      <Divider />
      <TreeView items={files} onSelectItem={setFileName} />
    </Container>
  );
};

export { FileDistribution };
