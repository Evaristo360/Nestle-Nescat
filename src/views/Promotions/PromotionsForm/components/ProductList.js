import React, { useState } from 'react';
import { TextField, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { style } from '../PromotionFormStyles.css';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CancelIcon from '@material-ui/icons/Cancel';

export const ProductList = ({
  Formik,
  list,
  methods
}) => {
  
  const classes = style();

  return (
    <>
      { list.listProducts.map((product, index) => (
          <div key={index}>
            { product.deleted ? null :
              <>
                <div className={classes.listTitle}>
                  <h1 className={classes.title}>Producto</h1>
                  <div className={classes.listButtons}>
                    { product.visible ? (
                        <ArrowDropDownIcon className={classes.arrowIcon} onClick={() => methods.hideProductList(index)}/>
                      ) : (
                        <ArrowDropUpIcon className={classes.arrowIcon} onClick={() => methods.hideProductList(index)}/>
                      )
                    }
                    <CancelIcon className={classes.deleteButton} onClick={() => methods.deleteProductList(index)}/>
                  </div>
                </div>
                { product.visible ?
                  <div >
                    <div className={classes.priority}>
                      <FormControl
                        variant="filled"
                        placeholder="hola"
                        className={classes.formControl}
                      >
                        <InputLabel
                          id="demo-simple-select-filled-label"
                          name={`division_id_${index}`}
                          className={classes.inputLabel}
                          autoFocus={true}
                        >
                          División
                        </InputLabel>
                        <Select
                          value={list.listProducts[index].division_id}
                          onChange={(e) => methods.handleProductListChange(e, index)}
                          className={classes.select}
                          name={`division_id_${index}`}
                        >
                          {list.listDivisions.map((option, index) => {
                            let value = option.id;
                            let label = option.name;

                            return <MenuItem value={value} key={`${label}=${value}${index}`}>{label}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>

                    <div className={classes.priority}>
                      <FormControl
                        variant="filled"
                        placeholder="hola"
                        className={classes.formControl}
                      >
                        <InputLabel
                          id="demo-simple-select-filled-label"
                          name={`category_id_${index}`}
                          className={classes.inputLabel}
                          autoFocus={true}
                        >
                          Categoría
                        </InputLabel>
                        <Select
                          value={list.listProducts[index].category_id}
                          onChange={(e) => methods.handleProductListChange(e, index)}
                          className={classes.select}
                          name={`category_id_${index}`}
                        >
                          {list.listProducts[index].categories.map((option, index) => {
                            let value = option.id;
                            let label = option.name;

                            return <MenuItem value={value} key={`${label}=${value}${index}`}>{label}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>

                    <div className={classes.priority}>
                      <FormControl
                        variant="filled"
                        placeholder="hola"
                        className={classes.formControl}
                      >
                        <InputLabel
                          id="demo-simple-select-filled-label"
                          name={`material_id_${index}`}
                          className={classes.inputLabel}
                          autoFocus={true}
                        >
                          Material group
                        </InputLabel>
                        <Select
                          value={list.listProducts[index].material_id}
                          onChange={(e) => methods.handleProductListChange(e, index)}
                          className={classes.select}
                          name={`material_id_${index}`}
                        >
                          {list.listProducts[index].materials.map((option, index) => {
                            let value = option.id;
                            let label = option.name;

                            return <MenuItem value={value} key={`${label}=${value}${index}`}>{label}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>

                    <div className={classes.priority}>
                      <FormControl
                        variant="filled"
                        placeholder="hola"
                        className={classes.formControl}
                      >
                        <InputLabel
                          id="demo-simple-select-filled-label"
                          name={`product_id_${index}`}
                          className={classes.inputLabel}
                          autoFocus={true}
                        >
                          Producto
                        </InputLabel>
                        <Select
                          value={list.listProducts[index].product_id}
                          onChange={(e) => methods.handleProductListChange(e, index)}
                          className={classes.select}
                          name={`product_id_${index}`}
                        >
                          {list.listProducts[index].products.map((option, index) => {
                            let value = option.id;
                            let label = option.name;

                            return <MenuItem value={value} key={`${label}=${value}${index}`}>{label}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    </div>

                    <div className={classes.priority}>
                      <FormControl
                        variant="filled"
                        placeholder="hola"
                        className={classes.formControl}
                      >
                        <InputLabel
                          id="demo-simple-select-filled-label"
                          name={`unit_type_id_${index}`}
                          className={classes.inputLabel}
                          autoFocus={true}
                        >
                          Tipo de unidad
                        </InputLabel>
                        <Select
                          value={list.listProducts[index].unit_type}
                          onChange={(e) => methods.handleProductListChange(e, index)}
                          className={classes.select}
                          name={`unit_type_id_${index}`}
                        >
                          <MenuItem value={true} >{"Caja"}</MenuItem>
                          <MenuItem value={false} >{"Pieza"}</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    <TextField
                      label="Cantidad minima"
                      name={`minimum_quantity_${index}`}
                      variant="filled"
                      margin="dense"
                      InputProps={{ disableUnderline: true }}
                      helperText={Formik.touched.minimum_quantity && Formik.errors.minimum_quantity}
                      className={classes.textField}
                      onChange={(e) => methods.handleProductListChange(e, index)}
                      value={list.listProducts[index].minimum_quantity}
                    />
                  </div> : null
                }
              </>
            }
          </div>
        ))
      }
      <div className={classes.listButtons}>
        <AddCircleRoundedIcon className={classes.addButton} onClick={methods.addProductList}/>
      </div>
    </>
  );
};