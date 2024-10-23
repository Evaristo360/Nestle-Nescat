import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import smallDownIcon from 'assets/icons/small-down.svg';

export const createOption = (value, label, Icon = null) => ({
  value,
  label,
  Icon
});

const Select = ({ items, onChange, name, value, className, style }) => {
  const [show, setShow] = React.useState(false);
  const optionsRef = React.useRef(null);
  const toggleShow = () => setShow(!show);
  const { currentTheme } = useTheme();

  React.useEffect(() => {
    const handleClick = (e) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(e.target) &&
        show
      ) {
        toggleShow();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [show]);

  const handleChange = (item) => {
    toggleShow();
    if (onChange) {
      onChange({ [name]: item.value });
    }
  };

  const selectedIndex = items.findIndex((it) => it.value === value);
  const selectedItem =
    selectedIndex !== -1 ? items[selectedIndex] : items[0] || {};
  const styles = css`
    font-size: 12px;
    min-width: 50px;
    position: relative;
    display: block;
    width: 100%;
    .placeholder {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0.5rem;
      background: ${currentTheme.background};
      border: none;
      color: ${currentTheme.texts};
      .emphasis {
        color: ${currentTheme.titles};
      }
      img {
        display: inline-block;
      }
    }
    .icon-placeholder {
      mask: url(${smallDownIcon});
      mask-size: cover;
      background: ${currentTheme.titles};
      width: 11px;
      height: 7px;
    }
    .options {
      z-index: 100;
      width: 100%;
      display: ${show ? 'block' : 'none'};
      position: absolute;
      top: 100%;
      right: 0;
      .option {
        width: 100%;
        border: none;
        padding: 0.5rem;
        background: ${currentTheme.background};
        color: ${currentTheme.texts};
        text-align: left;
        &:hover {
          background: ${currentTheme.active_button};
          color: ${currentTheme.active_button_Text};
        }
      }
    }
  `;

  return (
    <div css={styles} className={className} style={style}>
      <button className="placeholder" onClick={toggleShow}>
        <div>
          {selectedItem.Icon ? (
            <img
              src={selectedItem.Icon}
              className="img-fluid mr-2"
              style={{ width: '1rem' }}
            />
          ) : null}
          <span>{selectedItem.label}</span>
        </div>
        <div className="icon-placeholder"></div>
      </button>
      <div className="options" ref={optionsRef}>
        {items.map((it) => (
          <button
            className="option"
            onClick={() => handleChange(it)}
            key={it.label}
          >
            {it.Icon ? (
              <img
                src={it.Icon}
                className="img-fluid mr-1"
                style={{ width: '1rem' }}
              />
            ) : null}
            <span style={{ width: '90%' }}>{it.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
