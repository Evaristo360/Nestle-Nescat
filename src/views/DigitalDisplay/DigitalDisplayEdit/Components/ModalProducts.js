import React, { useReducer, useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DataGrid, esES } from '@material-ui/data-grid';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 150
  },
  {
    field: 'name',
    headerName: 'Nombre',
    width: 400
  }
];

export const ModalProducts = ({
  listProducts,
  productSelected,
  onhandleSelectProduct,
  onhandleClosed,
  visible,
  search,
  handleSearch
}) => (
  <Dialog fullWidth={true} open={visible} onClose={onhandleClosed}>
    <DialogTitle>
    <TextField
        placeholder="Buscar"
        variant="outlined"
        onChange={(e)=>{
          handleSearch(e.target.value.trim());
        }}
        value={search}
        style={{width:'50%'}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style:{height:40}
        }}
      />      
    </DialogTitle>
    <DialogContent
      style={{padding:'10px 20px'}}
    >
      <DataGrid
        style={{ height: 550, maxWidth: '100%'}}
        columns={columns}
        rows={listProducts}
        pageSize={10}
        onRowClick={(e) => {
          onhandleSelectProduct(e.row);
        }}
        localeText={esES.props.MuiDataGrid.localeText}
        className={"editar"}
        disableColumnMenu={true}
      ></DataGrid>
    </DialogContent>
  </Dialog>
);

