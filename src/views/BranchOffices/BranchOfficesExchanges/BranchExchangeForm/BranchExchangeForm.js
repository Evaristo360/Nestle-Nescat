import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import DrawerModal from 'components/DrawerModal';
import { CheckBox } from 'components/RadioRow';
import { useStyles } from './BranchExchangeFormStyles';
import { useFormStyles } from 'hooks/useFormStyles';
import { useBranchOfficeForm } from './useBranchExchangeForm';
import { messages } from './BranchExchangeFormMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const BranchExchangeForm = ({
  branchOfficeId,
  branchExchangeId,
  visible,
  onClose,
  onAccept
}) => {
  const msgs = useIntlMessages(messages);
  const classes = useStyles();
  const formClasses = useFormStyles();
  const {
    formik,
      productsRedeemOptions,
      AvailableOptions,
      getSelectedRadio,
      productsRedeemSearch,
      setProductsRedeemSearch,
      handleProductRedeemChange
  } = useBranchOfficeForm({ branchOfficeId, branchExchangeId, onAccept });

  return (
    <DrawerModal
      visible={visible}
      onClose={onClose}
      onAccept={(e)=>{formik.submitForm(e)}}
      title={branchExchangeId == 0 ? msgs.titleCreate : msgs.titleEdit}
      className={classes.root}
      disabledAccept={true}
    >
      <h2 className={classes.legend}>
        {msgs.textLegend}
      </h2>

      <Autocomplete
        value={formik.values.product_name}
        onChange={(event, newValue) => {handleProductRedeemChange(newValue)}}
        inputValue={productsRedeemSearch}
        onInputChange={(event, newInputValue) => {
          setProductsRedeemSearch(newInputValue);
        }}
        disableClearable
        noOptionsText={'No se encontraron resultados'}
        name={"product_name"}
        options={productsRedeemOptions}
        renderInput={(params) => 
          <TextField 
            {...params} 
            label={msgs.dataProduct} 
            variant="filled" 
            margin="dense" 
            placeholder="Seleccionar"
            style={{minHeight:24}}
            helperText={formik.touched.product_name && formik.errors.product_name} 
            InputProps={{...params.InputProps, disableUnderline: true}}
          />}
        className={classes.textSearchField}
      />

      <h2 className={classes.subtitle}>
        {msgs.dataAvailabilityTitle}
      </h2>
      
      <CheckBox
      name="limited"
      items={AvailableOptions}
      value={formik.values.limited}
      onChange={getSelectedRadio}
      ></CheckBox>

      <TextField
        label={msgs.dataNumberExchanges}
        name="number_exchanges"
        placeholder="Seleccionar"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.number_exchanges && formik.errors.number_exchanges}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.number_exchanges}
        disabled={!formik.values.limited}
      >
      </TextField>

    </DrawerModal>
  );
};
