import _ from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import { Box, Button, Menu, MenuItem } from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
  Translate as TranslateIcon
} from '@material-ui/icons';
import { useLanguage } from './hooks/useLanguage';
import { messages } from './LanguageMessages';

const Language = () => {
  const intl = useIntl();
  const { languageCode, availableLocales, handleChangeLocale } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLanguage = (newLocale) => {
    handleChangeLocale(newLocale);
    handleClose();
  };

  return (
    <Box mx={2}>
      <Button
        size="large"
        aria-controls="locale-menu"
        aria-haspopup="true"
        startIcon={<TranslateIcon />}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
      >
        {intl.formatMessage(messages.displayName, {
          locale: _.replace(languageCode, '-', '')
        })}
      </Button>

      <Menu
        id="locale-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {_.map(availableLocales, (locale, index) => (
          <MenuItem
            key={`${index}-${locale}`}
            onClick={() => {
              handleSelectLanguage(locale);
            }}
          >
            {`${intl.formatMessage(messages.displayName, {
              locale: _.replace(locale, '-', '')
            })} (${locale})`}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export { Language };
