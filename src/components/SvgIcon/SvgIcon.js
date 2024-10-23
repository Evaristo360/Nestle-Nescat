/* eslint-disable jsx-a11y/click-events-have-key-events */
import { css } from '@emotion/react';

/*
  *
  * Usage:
  * import ClockIcon from './icons/ClockIcon.svg';
  *
    <SvgIcon 
      src={ClockIcon} 
      color={currentTheme.emphasis} 
      width={18} 
      height={18}
    />
  * */
const a = (width) => (typeof width === 'string' ? width : `${width}px`);
const b = (height) => (typeof height === 'string' ? height : `${height}px`);
const c = (rotate) => `${rotate}deg`;

const SvgIcon = ({
  src,
  color = '#000000',
  width = '20px',
  height = '20px',
  className,
  style,
  rotate = 0,
  onClick,
  alt,
  ...otherProps
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  // eslint-disable-next-line jsx-a11y/interactive-supports-focus
  <div
    css={css`
      mask: url(${src});
      mask-size: cover;
      background: ${color};
      width: ${a(width)};
      height: ${b(height)};
      transform: rotate(${c(rotate)});
    `}
    onClick={onClick}
    className={className}
    style={style}
    alt={alt}
    role="button"
    {...otherProps}
  ></div>
);

export default SvgIcon;
