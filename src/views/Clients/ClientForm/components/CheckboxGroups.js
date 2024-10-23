import React, { useEffect } from 'react';
import { useTheme } from 'hooks/useTheme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { SwitchStyle } from '../ClientFormStyles';

export const CheckboxGroup = ({ label, subLabel, onCheck, options = [], values }) => {
  const { currentTheme } = useTheme();
  // console.log("values",values);
  // console.log("options",options);

  return (
    <div>
      {options.map((option,index) => {
        if (values.filter((value) => value.name === option.name).length !== 0) {
          var checked = values.filter((value) => value.name === option.name)[0]
            .checked;

          return (
            <FormControlLabel
              key={index}
              control={<SwitchStyle checked={checked} onChange={onCheck} name={option.name} />}
              label={option.label}
            />
          );
        }
      })}
    </div>
  );
};