import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStyles as DisplaysStyles } from '../TotemStyles';
import { Page } from './Page';
import { DigitalDisplayIcons } from 'assets';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { ModalProducts } from './ModalProducts';
import { messages } from '../TotemEditMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';

const useStyles = makeStyles({
  containerButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 15
  },
  buttonPages: {
    padding: '12px 6px 12px 6px'
  }
});

export const PageList = ({
  products = [],
  addPage,
  deletePage,
  listPages = [],
  oncloseModalProducts,
  onChangeDigitalProducts,
  editableForm,
  search,
  handleSearch,
  totemType
}) => {
  const msgs = useIntlMessages(messages);
  //styles
  const DigitalDisplayEditStyles = DisplaysStyles();
  const classes = useStyles();

  //ModalProducts
  const [openModalProducts, setOpenModalProducts] = useState(false);
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [page, setPage] = useState(0);


  //CardPage
  const [productSelected, setProductSelected] = useState({});
  
  // functionModalProduct
  const handleSelectProduct = (product) => {
    closeModalProducts()
    onChangeDigitalProducts(product, row, col, page);
  };

  const closeModalProducts = () =>{
    setOpenModalProducts(!openModalProducts);
  }

  const openModal = (product, r, c, p) => {
    setRow(r)
    setCol(c)
    setPage(p)
    setOpenModalProducts(!openModalProducts);
  };

  return (
    <div>
      {listPages.map((item, index) => (
        <div key={"div"+index}>
          <h2 key={"title"+index} className={DigitalDisplayEditStyles.pagesTitle}>
            {msgs.pageTitle} {item.page}
          </h2>
          <Page
            key={index}
            numberPage={item.page}
            productsPage={item.products}
            productSelected={productSelected}
            openModalProducts={openModal}
            editableForm={editableForm}
            totemType={totemType}
          ></Page>
        </div>
      ))}
      {editableForm 
      ? null
      :
      <div className={classes.containerButtons}>
        {listPages.length > 1 ? (
          <Tooltip title="Remover página">
            <IconButton
              onClick={() => {
                deletePage();
              }}
              className={classes.buttonPages}
              component="span"
            >
              <img
                src={DigitalDisplayIcons.RemovePageIcon}
                alt="Remove_Page_Icon"
              />
            </IconButton>
          </Tooltip>
        ) : null}
        <Tooltip title="Agregar página">
          <IconButton
            onClick={() => {
              addPage();
            }}
            className={classes.buttonPages}
            component="span"
          >
            <img src={DigitalDisplayIcons.AddPageIcon} alt="Add_Page_Icon" />
          </IconButton>
        </Tooltip>
      </div>
      }

      <ModalProducts
        listProducts={products}
        visible={openModalProducts}
        onhandleSelectProduct={handleSelectProduct}
        onhandleClosed={closeModalProducts}
        row={row}
        col={col}
        search={search}
        handleSearch={handleSearch}
      ></ModalProducts>
    </div>
  );
};