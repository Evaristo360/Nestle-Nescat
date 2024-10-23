import React from 'react';
import { useTheme } from 'hooks/useTheme';
import { messages } from './ProductFormMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import { TextField, MenuItem } from '@material-ui/core';
import { useStyles } from './ProductFormStyles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useProductForm } from './useProductForm';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { DigitalDisplayIcons } from 'assets';
import { Images } from 'assets';

export const ProductForm = ({
  numberProduct,
  dataProduct,
  handleAddProduct,
  handleQuitProduct,
  optionAdd,
  handleChangeValueJSONProduct,
  offline
}) => {
  const { currentTheme } = useTheme();
  const classes = useStyles({ currentTheme });
  const msgs = useIntlMessages(messages);

  const {
    divisionOptions,
    categoryOptions,
    materialGroupOptions,
    productListOptions,
    unitTypeOptions,
    formik
  } = useProductForm({
    dataProduct,
    handleAddProduct,
    handleChangeValueJSONProduct,
    numberProduct
  });

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Accordion style={{ width: '100%' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Producto {numberProduct + 1}
          </AccordionSummary>
          <AccordionDetails style={{ display: 'grid' }}>
            <div className="row">
              <div className="col-md-4">
                <TextField
                  select
                  label={msgs.dataDivision}
                  name="division_id"
                  placeholder="Seleccionar"
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true }}
                  helperText={
                    formik.touched.division_id && formik.errors.division_id
                  }
                  className={classes.textField}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleChangeValueJSONProduct(e.target, numberProduct);
                  }}
                  value={formik.values.division_id}
                >
                  {divisionOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-4">
                <TextField
                  select
                  label={msgs.dataCategory}
                  name="category_id"
                  placeholder="Seleccionar"
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true }}
                  helperText={
                    formik.touched.category_id && formik.errors.category_id
                  }
                  className={classes.textField}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleChangeValueJSONProduct(e.target, numberProduct);
                  }}
                  value={formik.values.category_id}
                  disabled={formik.values.division_id != '' ? false : true}
                >
                  {categoryOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-4">
                <TextField
                  select
                  label={msgs.dataMaterialGroup}
                  name="material_group_id"
                  placeholder="Seleccionar"
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true }}
                  helperText={
                    formik.touched.material_group_id &&
                    formik.errors.material_group_id
                  }
                  className={classes.textField}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleChangeValueJSONProduct(e.target, numberProduct);
                  }}
                  value={formik.values.material_group_id}
                  disabled={formik.values.category_id != '' ? false : true}
                >
                  {materialGroupOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <TextField
                  select
                  label={msgs.dataProductName}
                  name="product_id"
                  placeholder="Seleccionar"
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true }}
                  helperText={
                    formik.touched.product_id && formik.errors.product_id
                  }
                  className={classes.textField}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleChangeValueJSONProduct(e.target, numberProduct);
                  }}
                  value={formik.values.product_id}
                  disabled={
                    formik.values.material_group_id != '' ? false : true
                  }
                >
                  {productListOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-4">
                <TextField
                  select
                  label={msgs.dataUnitType}
                  name="unit_type"
                  placeholder="Seleccionar"
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true }}
                  helperText={
                    formik.touched.unit_type && formik.errors.unit_type
                  }
                  className={classes.textField}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleChangeValueJSONProduct(e.target, numberProduct);
                  }}
                  value={formik.values.unit_type}
                >
                  {unitTypeOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-4">
                <TextField
                  label={msgs.dataUnitPrice}
                  name="unit_price"
                  placeholder="Ej. $00.00"
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true, min: 1 }}
                  helperText={
                    formik.touched.unit_price && formik.errors.unit_price
                  }
                  className={classes.textField}
                  onChange={(e) => {
                    if (e.target.value > 0 || e.target.value === '') {
                      formik.handleChange(e);
                      handleChangeValueJSONProduct(e.target, numberProduct);
                    }
                  }}
                  value={formik.values.unit_price}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <TextField
                  label={msgs.dataQuantity}
                  name="quantity"
                  placeholder="Ej. 100"
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true, min: 1 }}
                  helperText={formik.touched.quantity && formik.errors.quantity}
                  className={classes.textField}
                  onChange={(e) => {
                    if (e.target.value > 0 || e.target.value === '') {
                      e.target.value =
                        e.target.value === '' ? '' : Math.trunc(e.target.value);
                      formik.handleChange(e);
                      handleChangeValueJSONProduct(e.target, numberProduct);
                    }
                  }}
                  value={formik.values.quantity}
                />
              </div>
              <div className="col-md-4">
                <TextField
                  label={msgs.dataTotalPrice}
                  name="price_total"
                  placeholder="Ej. $00.00"
                  variant="filled"
                  margin="dense"
                  InputProps={{ disableUnderline: true, min: 1 }}
                  helperText={
                    formik.touched.price_total && formik.errors.price_total
                  }
                  className={classes.textField}
                  onChange={(e) => {
                    if (e.target.value > 0 || e.target.value === '') {
                      formik.handleChange(e);
                      handleChangeValueJSONProduct(e.target, numberProduct);
                    }
                  }}
                  value={formik.values.price_total}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: '5px'
          }}
        >
          <IconButton
            onClick={() => {
              handleQuitProduct(numberProduct);
            }}
            component="span"
            disabled={offline ? false : numberProduct !== 0 ? false : true}
          >
            <img src={Images.DeleteIcon} alt={'delete'} />
          </IconButton>
        </div>
      </div>
      {optionAdd ? (
        <div className="row">
          <div
            className="col-md-12"
            style={{ textAlign: 'right', padding: '0px 40px' }}
          >
            <Tooltip title="Agregar producto">
              <IconButton
                onClick={(e) => {
                  formik.handleSubmit(e);
                }}
                component="span"
              >
                <img
                  src={DigitalDisplayIcons.AddPageIcon}
                  alt="Add_Page_Icon"
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ) : null}
    </div>
  );
};
