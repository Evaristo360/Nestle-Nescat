import { useTheme } from 'hooks/useTheme';
import { css } from '@emotion/react';

const Title = ({ children, style, className }) => {
  const { currentTheme } = useTheme();

  const styles = css`
    font: normal normal bold 25px/30px Verdana;
    color: ${currentTheme.titles};
  `;

  return (
    <h4 css={styles} style={style} className={className}>
      {children}
    </h4>
  );
};

export default Title;
