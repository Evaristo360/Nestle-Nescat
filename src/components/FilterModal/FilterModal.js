import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import InputCalendar from 'components/InputCalendar';
import { Button } from '@material-ui/core';
import { Images, Pages } from 'assets';
import Modal from '@material-ui/core/Modal';
import { createOption, SelectV2 } from 'components/SelectV2';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

const createOptions = (options) => {
  let arrayCreateOptions = [];
  options.map( opc => {
    arrayCreateOptions.push(createOption(opc.name, opc.id))
  });
  return arrayCreateOptions;
}
const createOptionsAutocomplete = (items) => {
  var options = [];
  items.map(item => {
    options.push(item.name);
  });
  return options;
} 

  const FilterModal = ({
  visible,
  defaultDate = null,
  onSearch,
  onRestore,
  onClose,
  endDate = false,
  optionStructure =[], 
  valueStructure, 
  setValueStructure = null
  
}) => {
  const { currentTheme } = useTheme();
  const styles = css`
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    right: 0px;
    width: 100%;
    // height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0e0e0e66 0% 0% no-repeat padding-box;
    .dialog {
      padding: 2rem;
    }
    .title h6 {
      color: #63513d;
      text-align: left;
      font: normal normal bold 21px/28px Roboto;
      letter-spacing: 0px;
      opacity: 1;
    }

    .subtitle {
      color: #007cba;
      text-align: left;
      font: normal normal normal 15px/20px Roboto;
      letter-spacing: 0px;
      opacity: 1;
    }
    .text {
      margin-top: 0.5rem;
    }
    .text p {
      text-align: left;
      font: normal normal normal 12px/16px Roboto;
      letter-spacing: 0px;
      color: #dcdcdc;
      // text-align: left;
      // font-size: 16px;
      // font-family: Verdana;
      // letter-spacing: 0px;
      // color: ${currentTheme.texts};
      // opacity: 0.5;
    }
    .flex-start {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 1rem;
    }
    button {
      background: transparent;
      color: ${currentTheme.button_Text};
      border: none;
      padding: 0.4rem 2rem;
      border-radius: 6px;
      font-size: 12px;
      text-align: left;
      font: normal normal bold 12px/14px Roboto;
      letter-spacing: 0.01px;
      // color: #000000;
      color: #e1e1e1;

      &:focus {
        outline: none;
      }
      &:hover {
        cursor: pointer;
        // background: ${currentTheme.active_button};
        color: ${currentTheme.active_button_Text};
      }
    }

    .container-modal-sw {
      margin-top: 4rem;
      position: absolute;
      right: 0px;
      // margin: auto;
      top: 0px;
      width: 70%;
      max-height:570px;      
      overflow-x: hidden;
      overflow-y: scroll;
      // border: 3px solid green;
      padding: 10px;
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000029;
      opacity: 1;
    }

    .mt-3 {
      margin-top: 3rem;
    }

    .mt-2 {
      margin-top: 2rem;
    }

    hr.new2 {
      margin-top: -0px;
      border: 1px solid #e1e1e1fc;
    }
    .MuiPickersDay-daySelected {
      background-color: #007cba !important;
      color: #007cba !important;
    }

    .label-input {
      letter-spacing: 0px;
      color: #5d5d5d;
      opacity: 1;
      font: normal normal normal 12px/16px Roboto;
      margin-top: 1.1rem;
    }

    .MuiInputBase-input {
      color: #63513d4d;
      font: normal normal normal 12px/16px Roboto;
      letter-spacing: 0px;
    }

    .MuiInput-underline:before {
      border-bottom: none;
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .MuiPickersDay-daySelected {
      //   color: #007cba;
      background-color: #007cba !important;
    }

    .MuiInput-root {
      background: #fbfbfb 0% 0% no-repeat padding-box;
      border-radius: 5px;

      .MuiPickersCalendarHeader-dayLabel {
        color: blue !important;
      }
    }

    .ml {
      margin-left: -10px;
    }

    .MuiFormControl-root{
      background-color: rgba(0, 0, 0, 0.09);
      color: #63513D!important;
      font: normal normal normal 12px/24px Roboto;
      width: 100%;
    },
    .main-button {
      display: inline-block;
      background: ${currentTheme.buttons};
      color: ${currentTheme.button_Text};
      border-radius: 5px;
      width: 180%;
      padding: 12px 8px 10px 8px;
      text-align: center;
      font: normal normal bold 12px/14px Roboto;
      letter-spacing: 0.01px;
      cursor: pointer;

      .add-icon-container {
        display: inline-block;
        margin-right: 8px;
      }

      .add-icon {
        fill: ${currentTheme.button_Text};
      }

      :hover {
        background: ${currentTheme.buttons_hover};
        color: ${currentTheme.active_button_Text};

        .add-icon {
          fill: ${currentTheme.active_button_Text};
        }
      }
    }
    .secondary-button {
      display: inline-block;
      background: ${currentTheme.buttons_secondary};
      color: ${currentTheme.button_Text};
      border-radius: 5px;
      width: 180%;
      padding: 12px 8px 10px 8px;
      text-align: center;
      font: normal normal bold 12px/14px Roboto;
      letter-spacing: 0.01px;
      cursor: pointer;
      margin-left: 60px;

      .add-icon-container {
        display: inline-block;
        margin-right: 8px;
      }

      .add-icon {
        fill: ${currentTheme.button_Text};
      }

      :hover {
        background: ${currentTheme.buttons_secondary_hover};
        color: ${currentTheme.active_button_Text};

        .add-icon {
          fill: ${currentTheme.active_button_Text};
        }
      }
    }
    .MuiInputBase-input{                  //FONT Text INPUTS DATEPICKER
      color:#63513D!important;
      font: normal normal normal 12px/24px Roboto;
    }
    .MuiSelect-select.MuiSelect-select{   //FONT Text SELECT
      color:#63513D!important;
      font: normal normal normal 12px/24px Roboto;
    }
    .MuiAutocomplete-endAdornment .MuiAutocomplete-popupIndicator{
      padding: 0px;
    }
    .MuiAutocomplete-endAdornment .MuiAutocomplete-popupIndicator{
      padding: 0px;
    }
    .MuiAutocomplete-endAdornment .MuiAutocomplete-popupIndicator .MuiSvgIcon-root{
      color: rgba(0, 0, 0, 0.54);
    }
    .MuiAutocomplete-endAdornment .Mui-disabled .MuiSvgIcon-root{
      color: rgba(0, 0, 0, 0.26);
    }
  `;
  const [selectedDate, setSelectedDate] = React.useState(defaultDate);
  const [selectedDateEnd, setSelectedDateEnd] = React.useState(null);
  const handleDateChange = (d) => {
    setSelectedDate(d);
  };
  const handleDateEndChange = (d) => {
    setSelectedDateEnd(d);
  };

  const changeValue = (name,val) => {
    let aux = {...valueStructure};
    aux[name] = val;
    if(setValueStructure){
      setValueStructure(aux)
    }
  }

  const onClickFilterButton = () => {};

  if (!visible) return null;

  return (
    <Modal
      open={visible}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      onClose={() => onClose()}
    >
      <div css={styles}>
        <div className="container-modal-sw">
          <div className="dialog">
            <div className="row">
              <div className="col-md-4">
                <div className="title">
                  <h6>Filtro de búsqueda</h6>
                </div>
              </div>
              <div className="col-md-7"></div>
              <div className="col-md-1">
                <Button onClick={() => onClose()} style={{}}>
                  <img src={Pages.ArrowIcon} alt="Search arrow" />
                  <img src={Pages.FilterIcon} alt="Search filters" />
                </Button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="subtitle">Fecha</div>
              </div>
            </div>
            <hr className="new2" />
            <div className="row mt-3">
              <div className="col-md-4">
                <InputCalendar
                  date={selectedDate}
                  onChangeDate={handleDateChange}
                  label="Fecha inicio:"
                  maxdate={selectedDateEnd ? selectedDateEnd : undefined}
                />
              </div>
              {endDate ? (
                <div className="col-md-4">
                  <InputCalendar
                    date={selectedDateEnd}
                    onChangeDate={handleDateEndChange}
                    label="Fecha Final:"
                    mindate={selectedDate ? selectedDate : undefined}
                  />
                </div>
              ) : null}
            </div>
            {optionStructure.map((section, index) => (
              <div key={index}>
                <div className="row mt-3">
                  <div className="col-md-12 mt-3">
                    <div className="subtitle">{section.title}</div>
                  </div>
                </div>
                <hr className="new2" />
                <div className="row mt-3">
                  {section.options.map((option,index)=>(
                    <div className="col-md-4" key={`${option}_${index}`}>
                      { option.type === "Datepicker" ? 
                        <InputCalendar
                          key={option.optionName}
                          id={option.optionName}
                          label={option.optionLabel}
                          name={option.optionName}
                          date={valueStructure[option.optionName] || null}
                          onChangeDate={(event) => {changeValue(option.optionName,new Date(event).toISOString())}}
                          mindate={option.minDate ? ( valueStructure[option.minDate] ? valueStructure[option.minDate] : undefined) : undefined}
                          maxdate={option.maxDate ? ( valueStructure[option.maxDate] ? valueStructure[option.maxDate] : undefined) : undefined}
                        />
                      :
                        (option.type === "TextField" ?
                          <TextField
                            key={option.optionName}
                            id={option.optionName}
                            label={option.optionLabel}
                            variant="filled"
                            margin="dense"
                            onChange={(event) => changeValue(option.optionName,event.target.value)}
                            value={valueStructure[option.optionName] || ''}  
                            disabled={option.depends ? ( valueStructure[option.depends] ? false : true ) : false}
                          />
                        :
                          (option.type === "TextSearch" ?
                            <Autocomplete
                              key={option.optionName}
                              id={option.optionName}
                              value={valueStructure[option.optionName] || ''}  
                              onChange={(event, newValue) => {
                                changeValue(option.optionName,newValue)
                              }}
                              inputValue={valueStructure[option.optionTextSearch] || ''}
                              onInputChange={(event, newInputValue) => {
                                changeValue(option.optionTextSearch,newInputValue)
                              }}
                              disableClearable
                              noOptionsText={'No se encontraron resultados'}
                              name={"branch_id_origin"}
                              options={createOptionsAutocomplete(option.options)}
                              renderInput={(params) => 
                                <TextField 
                                  {...params} 
                                  label={option.optionLabel}
                                  variant="filled" 
                                  margin="dense" 
                                  InputProps={{...params.InputProps}}
                                />}
                              disabled={option.depends ? ( valueStructure[option.depends] ? false : true ) : false}
                            />
                          :
                          <SelectV2
                            key={option.optionName}
                            id={option.optionName}
                            label={option.optionLabel}
                            name={option.optionName}
                            value={valueStructure[option.optionName] || ''}  
                            onChange={(event) => changeValue(option.optionName,event.target.value)}
                            options={createOptions(option.options)}
                            disabled={option.depends ? ( valueStructure[option.depends] ? false : true ) : false}
                          />
                          )
                        )
                      }
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-1">
                <div
                  onClick={() =>
                    onSearch({
                      selectedDate,
                      selectedDateEnd,
                    })
                  }
                  className="main-button"
                >
                  Buscar
                </div>
              </div>
              <div className="col-md-1">
                <div
                  onClick={() => {
                    setSelectedDate(defaultDate);
                    setSelectedDateEnd(null);
                    if(setValueStructure){
                      setValueStructure({})
                    }
                    onRestore();
                  }}
                  className="secondary-button"
                >
                  Restaurar
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

FilterModal.defaultProps = {
  onSearch: () => {},
  onRestore: () => {},
  onClose: () => {}
};
export default FilterModal;
