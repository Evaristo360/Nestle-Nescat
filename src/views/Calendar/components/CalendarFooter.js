import React from 'react';
import { useIntl } from 'react-intl';
import { css } from '@emotion/react';
import { Images } from 'assets';
import { messages } from '../messages';
import { useTheme } from 'hooks/useTheme';

export const CalendarFooter = (props) => {
  const { formatMessage } = useIntl();
  const { currentTheme } = useTheme();

  return (
    <footer
      css={css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-top: 0.5rem;
        section {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0.5rem;
          span {
            margin-left: 0.5rem;
            color: ${currentTheme.texts};
            opacity: 0.5;
            font-size: 14px;
          }
        }
      `}
    >
      <section>
        <img src={Images.showIcon} />
        <span>{formatMessage(messages.alwaysShow)}</span>
      </section>
      <section>
        <img src={Images.monitorIcon} />
        <span>{formatMessage(messages.intervalDate)}</span>
      </section>
      <section>
        <img src={Images.priorityIcon} />
        <span>{formatMessage(messages.priority)}</span>
      </section>
    </footer>
  );
};
