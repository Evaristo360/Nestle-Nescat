import React from 'react';
import { css, jsx } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useStyles, SwitchStyle } from '../ProfileStyles.css';

const CheckboxGroup = ({ label, subLabel, onCheck, options = [], values }) => {

  return (
    <div>
      {options.map((option) => {
        const currentOption = values.filter(
          (value) => value.name === option.name
        );
        if (currentOption.length !== 0) {
          const checked = currentOption[0].checked;

          return (
            <FormControlLabel
              control={
                <SwitchStyle
                  checked={checked}
                  onChange={onCheck}
                  name={option.name}
                />
              }
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
