import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion as AccordionMaterialUI,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { useStyles } from './AccordionStyles';

const Accordion = (props) => {
  const { items, className, expandIcon } = props;
  const classes = useStyles();

  if (_.size(items) === 0) return null;

  return (
    <div className={classes.root}>
      {_.map(items, (accordion, index) => (
        <AccordionMaterialUI className={className} key={index}>
          <AccordionSummary
            expandIcon={expandIcon || <ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
            key={index}
          >
            {_.isString(accordion.title) ? (
              <Typography className={classes.heading}>
                {accordion.title}
              </Typography>
            ) : (
              accordion.title
            )}
          </AccordionSummary>
          <AccordionDetails>
            {_.isString(accordion.content) ? (
              <Typography>{accordion.content}</Typography>
            ) : (
              accordion.content
            )}
          </AccordionDetails>
        </AccordionMaterialUI>
      ))}
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      content: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
    })
  ),
  className: PropTypes.string,
  expandIcon: PropTypes.node
};

export { Accordion };
