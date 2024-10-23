import React, { useState } from 'react';
import { css } from '@emotion/react';
import containerStyles from 'components/styles/containers.css';
import SvgIcon from 'components/SvgIcon';
import ThreeDotsButton from 'components/ThreeDotsButton';
import EditIcon from 'assets/icons/editar.svg';
import DeleteIcon from 'assets/icons/delete.svg';
import MuteIcon from 'assets/icons/volume-off.svg';
import UnmuteIcon from 'assets/icons/volumen.svg';
import WebIcon from 'assets/icons/web_item.svg';
import TextIcon from 'assets/icons/text_item.svg';
import VideoIcon from 'assets/icons/video_item.svg';
import ImageIcon from 'assets/icons/imagen_item.svg';
import mediaTypes from 'providers/sceneDesignMediaTypes';
import { useTheme } from 'hooks/useTheme';

const MediaItem = ({
  name = 'media-item-name',
  duration = 0,
  media_type = 'text',
  silence = false,
  toggleMute = () => {},
  onEdit = () => {},
  onDelete = () => {}
}) => {
  const [showControl, setShowControl] = useState(false);
  const toggleControl = () => setShowControl(!showControl);
  const { currentTheme } = useTheme();

  const renderIcon = () => {
    const currentMT = mediaTypes.find((mt) => mt.name === media_type);
    let Icon = currentMT ? currentMT.Icon : null;

    if (!Icon) return null;
    switch (media_type) {
      case 'video':
        return <SvgIcon src={VideoIcon} ></SvgIcon>//color={currentTheme.texts} />;
      case 'image':
        return (
          <SvgIcon
            src={ImageIcon}
            width={20}
            height={16}
            //color={currentTheme.texts}
          />
        );
      case 'web':
        return <SvgIcon src={WebIcon} ></SvgIcon>//color={currentTheme.texts} />;
      case 'text':
        return <SvgIcon src={TextIcon} ></SvgIcon>//color={currentTheme.texts} />;
      default:
        return null;
    }
  };

  const styles = css`
    ${containerStyles()}
    width: 100%;
    padding: 1rem 0.5rem;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    button {
      border: none;
      padding: 0.5rem;
      background: transparent;
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
    .info-item {
      background: #e1e1e133 0% 0% no-repeat padding-box;
      border-radius: 5px 5px 0px 0px;
      .data {
        opacity: 0.5;
      }
      span {
        color: ${currentTheme.texts};
        margin-left: 1rem;
        font-size: 14px;
      }
    }
    .control-item {
      background: ${currentTheme.background};
    }
  `;

  return (
    <div className="container media-item" css={styles} draggable>
      <div className="info-item flex between">
        <div
          style={{ height: '60px', borderRadius: '5px 5px 0px 0px' }}
          className="flex start data"
        >
          {renderIcon()}
          <span
            style={{ color: '#000' }}
          >{`${name} ( ${duration} segundos )`}</span>
        </div>
        <div>
          <ThreeDotsButton color="#20B5D3" onClick={toggleControl} />
        </div>
      </div>
      {showControl ? (
        <div
          style={{
            background: '#007CBA26 0% 0% no-repeat padding-box',
            marginTop: '0px',
            height: '40px',
            borderRadius: '5px 5px 0px 0px'
          }}
          className="control-item flex between"
        >
          <div>
            <button onClick={onEdit}>
              <SvgIcon
                src={EditIcon}
                color={currentTheme.primary}
                width={14}
                height={14}
              />
            </button>
            <button onClick={onDelete}>
              <SvgIcon
                src={DeleteIcon}
                color={currentTheme.primary}
                width={19}
                height={14}
              />
            </button>
          </div>
          <div>
            {media_type === 'video' ? (
              <button onClick={toggleMute}>
                {!silence ? (
                  <SvgIcon src={UnmuteIcon} color={currentTheme.texts} />
                ) : (
                  <SvgIcon src={MuteIcon} color={currentTheme.texts} />
                )}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MediaItem;
