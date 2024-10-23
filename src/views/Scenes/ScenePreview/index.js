/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable default-case */
import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import 'animate.css/animate.css';
import BackButton from 'components/BackButton';
import Title from 'components/Title';
import { useTheme } from 'hooks/useTheme';
import { calculateDimensions } from '../SceneDesign';
import { createMediaUrl } from './api';
import useModal from 'hooks/useModal';
import CancelOkModal from 'components/CancelOkModal';
import { getMsg } from './messages';
import SvgIcon from 'components/SvgIcon';
import closeIcon from 'assets/cerrar.svg';
import { ScenePreviewStyles } from './ScenePreviewStyles';

const HtmlRender = ({ content, className, bgColor = 'transparent' }) => {
  const styleText = css`
    background: ${bgColor};
    width: 100%;
    height: 100%;
    overflow: auto;
  `;

  return (
    <div
      css={styleText}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

const usePreview = ({ timeline = [] }) => {
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const goNextIndex = () => {
    setIndex((index) => {
      let nextIndex = Math.min(index + 1, timeline.length);

      if (nextIndex === timeline.length) {
        setFinished(true);

        return index;
      }

      return nextIndex;
    });
  };

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    let item = timeline[index];

    //if (item && !finished) {
    if (item) {
      timerRef.current = setInterval(goNextIndex, item.duration * 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [index, timeline]);

  return {
    currentItem: timeline[index] || {},
    finished,
    beginPreview: () => {
      setFinished(false);
      setIndex(0);
    }
  };
};

const textEffects = {
  none: 'Ninguno',
  fadeOut: 'Disolvencia de salida',
  leftMarquee: 'Marquesina izquierda',
  rightMarquee: 'Marquesina derecha',
  upMarquee: 'Marquesina arriba',
  downMarquee: 'Marquesina abajo'
};

export const ScenePreview = ({
  scene,
  show = false,
  timeline = [],
  onClose = () => {},
  onFinishDisplay = () => {},
  resolution = {},
  closeFullScreen,
  setCloseFullScreen = () => {},
  finalScene = true
}) => {
  const { currentTheme } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 600, height: 700 });
  const [videoDuration, setVideoDuration] = useState(0);
  const containerRegionRef = useRef(null);
  const videoRef = useRef(null);
  const { showModal, title, text, openModal, toggleModal } = useModal();
  const { currentItem, finished, beginPreview } = usePreview({ timeline });
  const [currentTextEffects, setTextEffects] = useState('');
  const isFullScreen = () => window.innerHeight === window.screen.height;
  const handle = useFullScreenHandle();
  const styles = ScenePreviewStyles({ dimensions, scene });

  useEffect(() => {
    if (show) {
      beginPreview();
      if (!isFullScreen()) handle.enter();
      document.addEventListener('fullscreenchange', exitHandler);
      document.addEventListener('webkitfullscreenchange', exitHandler);
      document.addEventListener('mozfullscreenchange', exitHandler);
      document.addEventListener('MSFullscreenChange', exitHandler);

      function exitHandler() {
        if (
          !document.fullscreenElement &&
          !document.webkitIsFullScreen &&
          !document.mozFullScreen &&
          !document.msFullscreenElement
        ) {
          ///fire your event
          // TODO: check this code and fix full screen error
          onClose();
          //onClose;
        }
      }
    }

    setCloseFullScreen(false);
  }, [show, scene, closeFullScreen]);

  useEffect(() => {
    let aWidth = window.innerWidth;
    let aHeight = window.innerHeight;

    if (
      typeof resolution.width === 'number' &&
      typeof resolution.height === 'number'
    ) {
      let { width, height } = calculateDimensions(
        aWidth,
        aHeight,
        resolution.width,
        resolution.height
      );

      setDimensions({ width, height });
    }
  }, [resolution]);

  useEffect(() => {
    let type = currentItem.media_type || currentItem.type;

    if (type === 'video' && videoRef.current) {
      let promisePlay = videoRef.current.play();

      if (promisePlay !== undefined) {
        promisePlay
          .then((_) => {})
          .catch((_) => {
            openModal(getMsg('autoplay'), getMsg('autoplayLong'));
          });
      }
    } else if (type === 'text') {
      updateTextEffects(currentItem);
    }
  }, [currentItem]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('error', onErrorVideo);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('error', onErrorVideo);
      }
    };
  }, [videoRef.current]);

  useEffect(() => {
    if (finished) {
      onFinishDisplay();
      if (finalScene) {
        // handle.exit();
      }
    }
  }, [finished]);

  const onErrorVideo = () => {
    openModal(getMsg('errorVideo'), getMsg('errorVideoLong'));
  };

  const updateTextEffects = (item) => {
    let cn = ['animate__animated'];

    if (item.effect !== textEffects.none) {
      switch (item.effect) {
        case textEffects.fadeOut:
          cn.push('animate__lightSpeedOutRight');
          setTimeout(
            () => setTextEffects(cn.join(' ')),
            1000 * (item.duration - 1)
          );

          return;
        case textEffects.leftMarquee:
          cn.push('animate__fadeInLeft');
          break;
        case textEffects.rightMarquee:
          cn.push('animate__fadeInRight');
          break;
        case textEffects.upMarquee:
          cn.push('animate__fadeInUp');
          break;
        case textEffects.downMarquee:
          cn.push('animate__fadeInDown');
          break;
      }

      setTextEffects(cn.join(' '));
    } else {
      setTextEffects('');
    }
  };

  const imgStyle = css`
    max-height: 100%;
    overflow: hidden;
    #contImg {
      max-width: 100%;
      img {
        max-height: ${dimensions.height}px;
        width: auto;
      }
    }
  `;

  const renderContent = (item) => {
    let type = item.media_type || item.type;

    switch (type) {
      case 'text':
        return (
          <HtmlRender
            content={item.edit_window}
            className={item.effect == 'Ninguno' ? '' : currentTextEffects}
            bgColor={item.effect == 'Ninguno' ? '' : item.colour_background}
          />
        );
      case 'image':
        return (
          <div css={imgStyle}>
            <div id="contImg">
              <img
                src={createMediaUrl(
                  item.advertisement_id,
                  item.extension,
                  'image'
                )}
                alt={`${getMsg('errorImage')} :\n${item.name}`}
                className={'img-fluid'}
              />
            </div>
          </div>
        );
      case 'video':
        return (
          <video
            className="img-fluid"
            ref={videoRef}
            muted={Boolean(item.silence)}
            src={createMediaUrl(item.advertisement_id, item.extension, 'video')}
            autoPlay
          ></video>
        );
      case 'web':
        let scaleFinal;

        if (item.scale_percentage < 10) {
          scaleFinal = `1.0${item.scale_percentage}`;
        } else if (item.scale_percentage == 100) {
          scaleFinal = 2;
        } else {
          scaleFinal = `1.${item.scale_percentage}`;
        }

        const upIframe = css`
          width: 100%;
          height: 100%;
          background-color: blue;
          overflow: scroll;
        `;

        const iframeStyles = css`
          -ms-zoom: ${scaleFinal};
          -moz-transform: scale(${scaleFinal});
          -moz-transform-origin: 0 0;
          -o-transform: scale(${scaleFinal});
          -o-transform-origin: 0 0;
          -webkit-transform: scale(${scaleFinal});
          -webkit-transform-origin: 0 0;
          width: 100%;
          height: 100%;
        `;

        return (
          <div css={upIframe}>
            <iframe
              src={item.url}
              frameBorder="0"
              allowtransparency="true"
              css={iframeStyles}
            ></iframe>
          </div>
        );
      default:
        return null;
    }
  };

  if (!show) return null;

  return (
    <>
      <FullScreen handle={handle}>
        {show && (
          <>
            <div
              className="container-fluid px-0"
              css={styles}
              ref={containerRegionRef}
            >
              <div className="preview--header flex start">
                <BackButton onClick={onClose} />
                <Title className="ml-3 title">{scene.name}</Title>
                <SvgIcon
                  className="modal--close-icon"
                  src={closeIcon}
                  alt="Cerrar"
                  color={'#FFFFFF 0% 0% no-repeat padding-box;'}
                  onClick={onClose}
                />
              </div>
              <div className="box flex center">
                {renderContent(currentItem)}
              </div>
            </div>
            {showModal ? (
              <CancelOkModal
                title={title}
                text={text}
                onAccept={toggleModal}
                onCancel={null}
              />
            ) : null}
          </>
        )}
      </FullScreen>
    </>
  );
};
