import { css } from '@emotion/react';
import hexToRGB from 'components/utils/hexToRBG';
import htmlIcon from 'assets/icons/txt-source.svg';
import BoldIcon from 'assets/icons/txt-bold.svg';
import ItalicIcon from 'assets/icons/txt-italic.svg';
import UndoIcon from 'assets/icons/undo.svg';
import RedoIcon from 'assets/icons/redo.svg';
import UnderlineIcon from 'assets/icons/txt-underline.svg';
import IndentIcon from 'assets/icons/txt-indent.svg';
import ImageIcon from 'assets/icons/image.svg';
import { makeStyles } from '@material-ui/core';

export const AddTextStyles = ({ currentTheme }) => css`
  display: flex;
  justify-content: space-between;
  background: ${currentTheme.background} 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  overflow-y: scroll;

  //Text Editor Styles
  strong,
  b {
    color: ${currentTheme.texts};
  }
  .jodit-container:not(.jodit_inline) {
    border: 1px solid ${currentTheme.titles};
    border-radius: 5px;
  }
  .jodit-container .jodit-workplace .jodit-wysiwyg,
  .jodit-container .jodit-workplace .jodit-wysiwyg_iframe,
  .jodit .jodit-workplace .jodit-wysiwyg,
  .jodit .jodit-workplace .jodit-wysiwyg_iframe {
    background-color: transparent;
  }
  .jodit-container:not(.jodit_inline) {
    background-color: transparent;
  }
  .jodit-ui-separator {
    display: none;
  }
  .jodit-toolbar__box:not(:empty) {
    border: 0px;
    background-color: red;
  }

  .jodit-ui-group_separated_true:not(:last-child):after {
    content: '';
    border-left: 0;
    border-right: 0px solid #dadada;
    padding: 0;
  }
  .jodit-ui-group {
    display: inline;
    display: -webkit-inline-box;
  }
  .jodit-toolbar-editor-collection_mode_horizontal {
    position: inline;
    background-image: url('');
    margin-top: 0px;
    margin-bottom: 100px;
  }
  .jodit-toolbar-collection,
  .jodit-toolbar-editor-collection {
    display: inline;

    padding-bottom: 10px;
  }

  //Icons
  .jodit-icon_image {
    background-image: url(${ImageIcon});
    path {
      display: none;
    }
  }
  .jodit-icon_underline {
    background-image: url(${UnderlineIcon});
    path {
      display: none;
    }
  }
  .jodit-icon_indent {
    background-image: url(${IndentIcon});
    path {
      display: none;
    }
  }
  .jodit-icon_bold {
    background-image: url(${BoldIcon});
    path {
      display: none;
    }
  }

  .jodit-icon_source {
    background-image: url(${htmlIcon});
    path {
      display: none;
    }
  }
  .jodit-icon_italic {
    background-image: url(${ItalicIcon});
    path {
      display: none;
    }
  }
  .jodit-icon_undo {
    background-image: url(${UndoIcon});
    path {
      display: none;
    }
  }
  .jodit-icon_redo {
    background-image: url(${RedoIcon});
    path {
      display: none;
    }
  }

  //Finish of text editor styles

  #leftSection {
    width: 75%;
    color: ${hexToRGB(currentTheme.texts, 0.5)};
    h1 {
      color: ${currentTheme.titles};
      font: normal normal bold 25px/30px Verdana;
    }
    h2 {
      color: ${currentTheme.texts};
      font: normal normal normal 16px/20px Verdana;
    }
    #head {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      h2 {
        margin-bottom: 19px;
      }
      #left {
        #dateInputs {
          display: flex;
          input {
            color: ${currentTheme.texts};
            width: 130px;
            margin-top: 6px;
            margin-right: 5px;
            font: normal normal normal 12px/15px Verdana;
            border: none;
            background-image: none;
            background-color: transparent;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
          }
        }
      }
      #right {
        margin-top: 38px;
      }
    }
    #instructions {
      text-align: justify;
      margin-top: 30px;
      font: normal normal normal 12px/15px Verdana;
      opacity:1px
    }
    #warning {
      text-align: justify;
      margin-top: 5px;
      font: normal normal normal 12px/15px Verdana;
      color: ${currentTheme.titles};
    }
    #workArea {
      margin-top: 50px;
      color: black;
      .jodit-toolbar__box {
        background-color: transparent;
      }
    }
    #bottomBtn {
      margin-top: 30px;
      display: flex;
      padding-right: 30px;
      button {
        margin-right: 30px;
      }
    }
  }
  #rightSection {
    padding-top: 20px;
    padding-left: 27px;
    padding-right: 27px;
    width: 506px;
    height: 90vh;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #e1e1e1;
    border-radius: 10px;
    // background-color: ${currentTheme.emphasis == '#000000'
      ? '#FAFBFC'
      : '#000000'};
    h3 {
      color: #007cba;
      font: normal normal normal 16px/19px Verdana;
    }
    .field {
      margin-top: 20px;
      p {
        // color: ${currentTheme.texts};
        font: normal normal normal 12px/15px Verdana;
      }
      input {
        margin-top: 8px;
        border: none;
        padding-bottom: 7px;
        background-image: none;
        font-size: 12px;
        background-color: transparent;
        border-bottom: 1px;
        border-bottom-style: solid;
        border-bottom-color: #00ffee;
        width: 100%;
        padding-bottom: 12px;
        // color: ${currentTheme.texts};
      }
      #colorDiv {
        display: flex;
        border-radius: 60px;
        border: none;
        #colorSelection {
          margin-right: 5px;
          -webkit-appearance: none;
          padding: 0;
          border: none;
          width: 30px;
          height: 30px;
          border: 1px solid white;
          border-radius: 60px;
          cursor: pointer;
        }
        #colorSelection::-webkit-color-swatch {
          border: none;
          border-radius: 60px;
          padding: 0;
        }
        #colorSelection::-webkit-color-swatch-wrapper {
          border: none;
          border-radius: 60px;
          padding: 0;
        }

        #colorName {
          width: 50%;
        }
      }

      label {
        margin-left: -5px;
        font: normal normal normal 12px/15px Verdana;
        // color: ${hexToRGB(currentTheme.texts, 0.25)};
      }
      #firstInp {
        margin-bottom: 10px;
      }
      #fieldDes {
        font: normal normal normal 10px/12px Verdana;
        margin-top: 6px;
      }
      p {
        margin-bottom: 20px;
      }
    }
  }
  #spaceSel {
    margin-right: 20px;
  }
`;

export const useAddTextStyles = makeStyles({
  root: {
    padding: '2rem'
  },
  header: {
    padding: '1rem',
    background: '#007CBA0D'
  }
});
