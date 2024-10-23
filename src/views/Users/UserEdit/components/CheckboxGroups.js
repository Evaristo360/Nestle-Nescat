import React, { useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useStyles, SwitchStyle } from '../ProfileStyles.css';
import FormGroup from '@material-ui/core/FormGroup';

const CheckboxGroup = ({ label, subLabel, onCheck, options = [], values }) => {
  const { currentTheme } = useTheme();

  return (
    <div>
      {options.map((option) => {
        if (values.filter((value) => value.name === option.name).length !== 0) {
          var checked = values.filter((value) => value.name === option.name)[0]
            .checked;

          return (
            <FormControlLabel
              control={<SwitchStyle checked={checked} onChange={onCheck} name={option.name} />}
              label={option.label}
              key={option.name}
            />
          );
        }
      })}
    </div>
  );
};

export default CheckboxGroup;
