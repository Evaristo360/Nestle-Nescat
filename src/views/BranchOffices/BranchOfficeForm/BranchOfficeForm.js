import React from 'react';
import { TextField, FormControl, MenuItem } from '@material-ui/core';
import DrawerModal from 'components/DrawerModal';
import { useStyles } from './BranchOfficeFormStyles';
import { useFormStyles } from 'hooks/useFormStyles';
import { useBranchOfficeForm } from './useBranchOfficeForm';
import { messages } from './BranchOfficeFormMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const BranchOfficeForm = ({
  branchOfficeId,
  visible,
  onClose,
  onAccept
}) => {
  const msgs = useIntlMessages(messages);
  const classes = useStyles();
  const formClasses = useFormStyles();
  const {
    formik,
    regionOptions,
    formatOptions,
    subformatOptions,
    clientOptions,
    relationOptions,
    subformatSearch,
    setSubformatSearch,
    handleSubformatChange
  } = useBranchOfficeForm({ branchOfficeId, onAccept });

  return (
    <DrawerModal
      visible={visible}
      onClose={onClose}
      onAccept={(e)=>{formik.submitForm(e)}}
      title={branchOfficeId == 0 ? msgs.titleCreate : msgs.titleEdit}
      className={classes.root}
      disabledAccept={true}
      useScroll={true}
    >
      <TextField
        label={msgs.dataName}
        name="name"
        placeholder="Ej.Sucursal 1"
        variant="filled"
        margin="dense"
        disabled={formik.values.id ? true : false}
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.name && formik.errors.name}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      
      <TextField
        label={msgs.dataNestle_Id}
        name="nestle_id"
        placeholder="Ej. 123456"
        variant="filled"
        margin="dense"
        disabled={formik.values.id ? true : false}
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.nestle_id && formik.errors.nestle_id}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.nestle_id}
      />

      <TextField
        select
        label={msgs.dataRegion_ID}
        name="region_id"
        placeholder="Seleccionar"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.region_id && formik.errors.region_id}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.region_id}
      >
        {regionOptions.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label={msgs.dataFormat_ID}
        name="format_id"
        placeholder="Seleccionar"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.format_id && formik.errors.format_id}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.format_id}
      >
        {formatOptions.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>

      <Autocomplete
        freeSolo
        value={formik.values.subformat_name}
        onChange={(event, newValue) => {handleSubformatChange(newValue)}}
        inputValue={subformatSearch}
        onInputChange={(event, newInputValue) => {
          handleSubformatChange(newInputValue);
          setSubformatSearch(newInputValue);
        }}
        disableClearable
        noOptionsText={'No se encontraron resultados'}
        name={"subformat_name"}
        options={subformatOptions}
        renderInput={(params) => 
          <TextField 
            {...params} 
            label={msgs.dataSubformat_ID} 
            variant="filled" 
            margin="dense" 
            placeholder="Seleccionar"
            style={{minHeight:24}}
            helperText={formik.touched.subformat_name && formik.errors.subformat_name} 
            InputProps={{...params.InputProps, disableUnderline: true}}
          />}
        className={classes.textSearchField}
      />

      <TextField
        label=""
        name="address"
        placeholder={msgs.dataAddress}
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.address && formik.errors.address}
        className={classes.textAreaField}
        onChange={formik.handleChange}
        value={formik.values.address}
        multiline
        rows={4}
      />

      <h2 className={classes.subtitle}>
        {msgs.dataClientTitle}
      </h2>

      <TextField
        select
        label={msgs.dataClient_ID}
        name="client_id"
        placeholder="Seleccionar"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.client_id && formik.errors.client_id}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.client_id}
      >
        {clientOptions.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label={msgs.dataRelation_ID}
        name="url_id"
        placeholder="Seleccionar"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.url_id && formik.errors.url_id}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.url_id}
      >
        {relationOptions.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
    </DrawerModal>
  );
};
