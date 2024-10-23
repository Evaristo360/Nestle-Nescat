import React from 'react';
import { DigitalDisplayIcons } from 'assets';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { TextField, MenuItem, FormControl, InputLabel, Select, ListItemIcon, ListItemText, Checkbox} from '@material-ui/core';
import { style } from '../PromotionsDescriptionStyles.css';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CancelIcon from '@material-ui/icons/Cancel';

export const ClientList = ({
  handleChanges,
  selected,
  MenuProps, 
  useStyles2, 
  options,
  saleOffId,
  variables,
  list,
  methods,
}) => {
  const classes = style();
  const classes2 = useStyles2();
  return (
    <>
      { list.listClients.map((client, index) => (
          <div key={index}>
            <div className={classes.listTitle}>
              <h1 className={classes.title}>Cliente</h1>
              <div className={classes.listButtons}>
                { client.visible ? (
                  <Tooltip title="Ocultar cliente">
                    <IconButton
                      onClick={() => {
                        methods.hideClientList(index);
                      }}
                      className={classes.arrowIcon}
                      component="span"
                    >
                      <ArrowDropDownIcon />
                    </IconButton>
                  </Tooltip>
                  ) : (
                    <Tooltip title="Mostrar cliente">
                      <IconButton
                        onClick={() => {
                          methods.hideClientList(index);
                        }}
                        className={classes.arrowIcon}
                        component="span"
                      >
                        <ArrowDropUpIcon/>
                      </IconButton>
                    </Tooltip>
                  )
                }
                {/* { saleOffId === 1 ? 
                  <Tooltip title="Remover cliente">
                    <IconButton
                      onClick={() => {
                        methods.deleteClientList(index);
                      }}
                      className={classes.deleteButton}
                      component="span"
                    >
                      <CancelIcon  /> 
                    </IconButton>
                  </Tooltip>
                  : saleOffId === 2 ? null : null
                } */}
              </div>
            </div>
            { client.visible ?
              <div>
                {/* <FormControl
                  variant="filled"
                  placeholder="hola"
                  className={classes.formControl}
                >
                  <InputLabel
                    id="demo-simple-select-filled-label"
                    name={`client_id_${index}`}
                    className={classes.inputLabel}
                    autoFocus={true}
                  >
                    Cliente
                  </InputLabel>
                  <Select
                    value={list.listClients[index].client_id}
                    onChange={(e) => methods.handleClientListChange(e, index)}
                    className={classes.select}
                    name={`client_id_${index}`}
                    disabled
                  >
                    {list.listsOfClients.map((option, index) => {
                      let value = option.id;
                      let label = option.bussiness_name;

                      return <MenuItem value={value} key={`${label}=${value}${index}`}>{label}</MenuItem>;
                    })}
                  </Select>
                </FormControl> */}
                <TextField
                  label="Cliente"
                  name={`client_id_${index}`}
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true }}
                  className={classes.textField}
                  value={list.listClients[index].client_id}
                  disabled
                />
              </div> : null
            }
            { client.visible ?
              <div>
                {/* <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel 
                    id="mutiple-select-label" 
                    name={`branches_id_${index}`}
                    className={classes.inputLabel}
                    autoFocus={true}
                    placeholder="Multiple Select"
                  >Sucursal</InputLabel>
                  <Select
                    name={`branches_id_${index}`}
                    labelId="mutiple-select-label"
                    multiple
                    value={list.listClients[index].branch_ids}
                    onChange={(e) => handleChanges(e, index)}
                    renderValue={(value) => value.join(", ")}
                    className={classes.select}
                    MenuProps={MenuProps}
                  >
                    {client.branches.length > 0 ?
                    <MenuItem
                      value="all"
                      classes={{
                        root: client.isAllSelected ? classes2.selectedAll : ""
                      }}
                    >
                      <ListItemIcon className={classes.checkBoxSelect}>
                        <Checkbox
                          classes={{ indeterminate: classes2.indeterminateColor }}
                          checked={client.isAllSelected}
                          indeterminate={
                            list.listClients[index].branch_ids.length > 0 && list.listClients[index].branch_ids.length < client.branches.length
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        classes={{ primary: classes2.selectAllText }}
                        primary="Todas"
                      />
                    </MenuItem> : null
                    }
                    {client.branches.map((option) => (
                      <MenuItem key={option.name} value={option.id}>
                        <ListItemIcon className={classes.checkBoxSelect}>
                          <Checkbox checked={list.listClients[index].branch_ids.indexOf(option.id) > -1} size="medium"/>
                        </ListItemIcon>
                        <ListItemText primary={option.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

                <TextField
                  label="Sucursal"
                  name={`branches_id_${index}`}
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true }}
                  className={classes.textField}
                  value={list.listClients[index].branch_ids}
                  disabled
                />
              </div> : null
            }
          </div>
        ))
      }
      
      {/* <div className={classes.listButtons}>
        { saleOffId === 1 ? (
          <Tooltip title="Agregar página">
            <IconButton
              onClick={() => {
                methods.addClientList();
              }}
              className={classes.addButton}
              component="span"
            >
              <AddCircleRoundedIcon className={classes.addButton}/>
            </IconButton>
          </Tooltip>
          // <AddCircleRoundedIcon className={classes.addButton} onClick={methods.addClientList} />
        ) : (
          <>
            { list.listClients.length > 1 ? 
              <Tooltip title="Remover página">
                <IconButton
                  onClick={() => {
                    methods.deleteClientListTotal();
                  }}
                  className={classes.addButton}
                  component="span"
                >
                  <img
                    src={DigitalDisplayIcons.RemovePageIcon}
                    alt="Remove_Page_Icon"
                  />
                </IconButton>
              </Tooltip> : null
            }

            <Tooltip title="Agregar página">
              <IconButton
                onClick={() => {
                  methods.addClientList();
                }}
                className={classes.addButton}
                component="span"
              >
                <img src={DigitalDisplayIcons.AddPageIcon} alt="Add_Page_Icon" />
              </IconButton>
            </Tooltip>
          </>
        )
        }
      </div> */}

    </>
  );
};