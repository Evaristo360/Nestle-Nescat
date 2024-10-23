import { css } from '@emotion/react';
import containerStyles from 'components/styles/containers.css';
import themeStyles from 'components/styles/theme.css';
import hexToRGB from 'components/utils/hexToRBG';
import { makeStyles } from '@material-ui/core/styles';

export const AddMediaModalStyles = ({ currentTheme }) => css`
  ${containerStyles()} ${themeStyles({ currentTheme })}
  width: 100%;
  height: 100%;
  background: ${currentTheme.background};
  border-radius: 8px;

  button:not(.normal) {
    border: none;
    background: transparent;
  }
  .dnd-container {
    border-radius: 6px;
    border: 1px solid ${currentTheme.emphasis};
    padding: 1rem;
    height: 75vh;
  }
  .assigned-item {
    min-width: 70%;
    padding: 0.35rem 0.5rem;
    background: ${hexToRGB(currentTheme.texts, 0.12)};
    border: none;
    border-radius: 6px;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.5rem;
    span {
      opacity: 0.6;
      font-size: 14px;
    }
  }
  ol {
    list-style: none;
    padding-left: 0;
  }
  .upload-region {
    p {
      opacity: 0.6;
    }
  }
  .preview-media {
    width: 110px;
    height: 110px;
    video,
    img {
      width: 100%;
      height: 100%;
    }
  }
  .media-table {
    margin-top: 3rem;
    img {
      max-width: 50px;
      width: 100%;
      height: auto;
    }
  }
  thead {
    span {
      cursor: pointer;
    }
  }
  .main-box {
    overflow-y: scroll;
    height: 75vh;
  }
`;

export const useMediaModalStyles = makeStyles({
  root: {
    padding: '2rem',
    borderRadius: '8px'
  },
  headerModal: {
    background: '#007CBA0D',
    padding: '1rem'
  },
  text:{
    color:props => props.currentTheme.texts,
  }
});
