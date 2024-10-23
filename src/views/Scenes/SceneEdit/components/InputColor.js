import { useEffect, useRef } from 'react';
import { useTheme } from 'hooks/useTheme';
import { css } from '@emotion/react';
import { HexColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';

const InputColor = ({ name, value, onChange }) => {
  const { currentTheme } = useTheme();
  const hexPickerRef = useRef(null);

  const togglePicker = (e) => {
    if (hexPickerRef.current) {
      let display = hexPickerRef.current.style.display;

      if (display === 'none') {
        display = 'block';
      } else {
        display = 'none';
      }

      hexPickerRef.current.style.display = display;
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (
        hexPickerRef.current &&
        hexPickerRef.current.style.display === 'block' &&
        !hexPickerRef.current.contains(event.target)
      ) {
        togglePicker();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const styles = css`
    font-size: 12px;
    display: block;
    width: 100%;
    margin-top: 0.5rem;

    input{
      width: 100%;
      padding: 0.5rem 0.8rem;
      background: rgba(225, 225, 225, 0.15);
      border: none;
      border-radius: 6px;
      border-bottom: 1px solid ${currentTheme.titles};
      color: #fff;

      :focus {
        border: none
        border-bottom: 1px solid ${currentTheme.titles};
        outline: none;
      }
    }
    .picker-container{
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .picker{
        width: 15%;
        display: inline-block;
        padding: 0.2rem;
        .point-picker{
          width: 30px;
          height: 30px;
          border: none;
          background: transparent;
          border-radius: 5px;
          // border: 1px solid ${currentTheme.texts};
        }
      }
      .input-cont{
        width: 85%;
        display: inline-block;
      }
    }
  `;

  const handleChange = (event) => {
    let color = event;

    if (typeof event !== 'string') {
      color = event.target.value;
    }

    if (onChange) {
      onChange({ name, value: color });
    }
  };

  return (
    <div css={styles}>
      <div className="picker-container">
        <div
          className="hex-picker"
          ref={hexPickerRef}
          style={{
            display: 'none',
            position: 'absolute',
            bottom: '32px',
            left: '19%',
            zIndex: 1000
          }}
        >
          <HexColorPicker color={value} onChange={handleChange} />
        </div>
        <div className="picker">
          <button
            type="button"
            className="point-picker"
            onClick={togglePicker}
            style={{
              marginLeft: '10px',
              padding: '10px',
              backgroundColor: value
            }}
          ></button>
        </div>
        <div className="input-cont">
          <input
            type="text"
            name={name}
            onChange={handleChange}
            value={value}
          />
        </div>
      </div>
    </div>
  );
};

export default InputColor;
