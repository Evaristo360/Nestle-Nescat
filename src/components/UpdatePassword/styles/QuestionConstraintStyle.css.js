import { css } from "@emotion/react";
import { useTheme } from "../../../contexts/themeContext";

export const modalStyle = () => {
  const { currentTheme } = useTheme();

  return css`
    position: fixed;
    width: 100%;
    height:100%;
    color: white;
    background-color: ${currentTheme.background};
    display:flex;
    justify-content: center;
    z-index: 2000;
    #circles{
        cursor: pointer;
        padding-right: 20px;
        .circle{
            margin:2px;
            width:6px;
            height:6px;
            border-radius: 6px;
            background-color: #00FFEE;
        }
    }
    #conditionOptions{
        padding: 0;
        position: relative;
        left:20px;
        display:inline-block;
        top:0px;
        width: 100px;

        color: white;

        right:50px;

        margin-left: 0; padding-left: 0;
        z-index:1000;
        a{
            color: white;
            text-decoration: none;
        }
        ul{
            border-radius: 0px 0px 15px 15px;
            box-shadow: 0px 3px 6px #00000029;
            list-style-type: none;
            padding: 0;
            text-decoration: none;
            margin-left: 0; padding-left: 0;
            li{

                padding: 0px;
                margin: 0px;
                background-color:${currentTheme.button};
                margin-left: 0; padding-left: 0;
                text-decoration: none;
                transition: .1s;
                padding: 4px 0px 3px 4px;
                :hover{
                    background-color: #00FFEE;
                    color: black;
                }
            }
            li:nth-child(2) {
                background-color: none;
                border-radius: 0px 0px 15px 15px;
             }
        }

    }
    p{
      font-size: 16px;
      color: ${currentTheme.texts};
      opacity: 0.5;
    }
    a{
        text-decoration:none;
    }
    .questionSelected, .answerSelected{
      background-color: ${currentTheme.emphasis};
      color: ${currentTheme.background}
    }
    .wtTxt{
      font-size: 14px;
      color: ${currentTheme.texts};
    }
    .modalContent{
        flex-direction: column;
        display:flex;
        align-items: left;
        justify-content: center;
    }
    .constraint-table, .question-table, .answer-table{
        background-color: ${currentTheme.background};
        text-align: left;
        font: normal normal normal 12px/15px Verdana;
        letter-spacing: 0px;
        color: ${currentTheme.texts};
        opacity: 0.5;
    }

    .question-table, .answer-table{
      border: 1px solid ${currentTheme.emphasis};
    }

    h2{
        color: ${currentTheme.emphasis};
        font-size: 1rem;
    }

    .buttonClass{
        background-color:  ${currentTheme.button};
        color:  ${currentTheme.button_Text};
        border: 0px;
        padding: 9px 15px 9px 15px;
        height: 37px;
        bottom:0px;
        border-radius: 5px;
        text-decoration:none;
        cursor: pointer !important;
        :hover{
            background-color: ${currentTheme.active_button};
            color: ${currentTheme.active_button_Text};
        }
    }

    #status {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently*/
        cursor: pointer;
        .statusHeader{
            box-shadow: 0px 5px 3px #00000026;
            border-radius: 5px;
            padding: 8px 13px 8px 13px;
            color: #82786F;
            img{
                margin-left:15px;
            }
        }
        #statusOptions{
            position: fixed;
            width: 200px;
            box-shadow: 0px 5px 3px #00000026;
            border-radius: 5px;
            z-index:2;
            .statusElement{
                padding: 10px 13px 10px 13px;
                width: 100%;
                transition: .5s;
                border-radius: 5px 5px 0px 0px;
                background-color: ${currentTheme.background};
                color: ${currentTheme.texts};
                :hover{
                    background-color: ${currentTheme.active_button};
                    color: ${currentTheme.background};
                }
            }
        }
`;
};
