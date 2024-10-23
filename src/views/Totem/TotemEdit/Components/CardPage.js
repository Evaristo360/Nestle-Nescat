import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { messages } from './componentsMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    minHeight: 132,
    maxWidth: '100%',
    maxHeight: 132,
    backgroundColor: 'rgba(225, 225, 225, 0.15)!important', 
    padding: 0 
  },
  bodyCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 132,
    width: '100%',
    color: '#fff',
    textAlign: 'center',
    font: 'normal normal normal 11px/15px Roboto'
  },
  title: {
    marginTop: '12px',
    marginBottom: '12px',
    textAlign: 'center',
    font: 'normal normal normal 16px Roboto',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1
  },
  actionArea: {
    maxHeight: '100%'
  },
  cardMedia: {
    height: 132,
    width: '100%',
    objectFit: 'fill'
  },
  ProductNotAvailable: {
    backgroundColor: 'rgba(166,14,39,255)!important'
  },
  contentProductNotAvailable: {
    display: 'contents',
    fontSize: 9
  }
});

export const CardPage = ({ productCard, onhandleOpenModal, row, col, page, editableForm }) => {
  const classes = useStyles();
  const msgs = useIntlMessages(messages);
  const isNotAvailable = productCard 
    ? (productCard.availability == 0 ? true : false) 
    : false;

  return (
    <Card
      className={`${classes.root} ${isNotAvailable && classes.ProductNotAvailable}`}
    >
      {editableForm 
      ?
        productCard !== null ? (
          isNotAvailable 
          ? <CardContent className={classes.bodyCard}>
              {productCard.product_name}
              <br />
              <br />
              <span className={classes.contentProductNotAvailable}>
                {msgs.productNotAvailable}
                <br />
                {msgs.dontShowProduct}
              </span>
            </CardContent>
          : <CardContent className={classes.bodyCard}>{productCard.product_name}</CardContent>
        ) : (
          <CardContent className={classes.bodyCard}></CardContent>
        )
      :
        <CardActionArea
          className={classes.actionArea}
          onClick={() => {
            onhandleOpenModal(productCard, row, col, page);
          }}
        >
          {productCard != null ? (
            // productCard.product_image != "" ? (
            //   <CardMedia
            //     component="img"
            //     className={classes.cardMedia}
            //     image={productCard.product_image}
            //     title={productCard.product_name}
            //   />
            // ) :(
            //   <CardContent className={classes.bodyCard}>{productCard.product_name}</CardContent>
            // )
            isNotAvailable 
            ? <CardContent className={classes.bodyCard}>
                {productCard.product_name}
                <br />
                <br />
                <span className={classes.contentProductNotAvailable}>
                  {msgs.productNotAvailable}
                  <br />
                  {msgs.dontShowProduct}
                </span>
              </CardContent>
            : <CardContent className={classes.bodyCard}>{productCard.product_name}</CardContent>
          ) : (
            <CardContent className={classes.bodyCard}>Posición ( {row+1} , {col+1} ) <br/>  Seleccinar producto</CardContent>
          )}
        </CardActionArea>
      }
    </Card>
  );
};

