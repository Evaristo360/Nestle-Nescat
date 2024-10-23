import { css } from '@emotion/react';
import containerStyles from 'components/styles/containers.css';
import { useTheme } from 'hooks/useTheme';
import hexToRGB from 'components/utils/hexToRBG';

const ScenePreviewStyles = ({ dimensions, scene }) => {
  const { currentTheme } = useTheme();

  return css`
    ${containerStyles()}
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: #000000f0;
    align-items: center;
    position: relative;
    .modal--close-icon {
      z-index: 100;
      position: absolute;
      right: 5vw;
      cursor: pointer;
      opacity: 0.5;
    }
    .preview--header {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #000000 0% 0% no-repeat padding-box;
      padding: 2rem 3rem;
      opacity: 0.4;
    }
    .box {
      width: ${dimensions.width}px;
      height: ${dimensions.height}px;
      border: 2.5px solid red;
      background: ${scene.color || currentTheme.background};
      video,
      img {
        width: 100%;
        max-height: 100%;
      }
    }
    .title {
      color: white;
    }
  `;
};

export { ScenePreviewStyles };
