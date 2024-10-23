import React, { useEffect, useReducer, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardPage } from './CardPage';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  gridRow: {
    paddingTop: 4,
    paddingBottom: 4
  }
});

export const Page = ({ numberPage, productsPage, openModalProducts,editableForm, totemType }) => {
  const initial = (row, col) => {
    let matrix = new Array(row)
      .fill(null)
      .map((item) => new Array(col).fill(null));
    productsPage.map((product) => {
      matrix[product.row - 1][product.col - 1] = product;
    });
    return matrix;
  };

  const classes = useStyles();
  //Config Limit Page
  const maxRow = 4;
  const maxColumn = 3;

  const [matrix, setMatrix] = useState(initial(maxRow, maxColumn));

  useEffect(() => {
    if (totemType === 1) {
      setMatrix(initial(maxRow, maxColumn))
    } else {
      setMatrix(initial(3, maxColumn))
    }
  }, [productsPage]);

  const sendDataToPageList = (val, r, c, p) => {
    openModalProducts(val, r, c, p);
  };

  return (
    <Grid container>
      {matrix.map((row, rowIndex) => (
        <Grid container item xs={12} spacing={3} className={classes.gridRow} key={rowIndex}>
          {row.map((column, columnIndex) => (
            <Grid item xs={4}  key={columnIndex}>
              <CardPage
                editableForm={editableForm}
                onhandleOpenModal={sendDataToPageList}
                productCard={column}
                row={rowIndex}
                col={columnIndex}
                page={numberPage}
                key={`${numberPage}${rowIndex}${columnIndex}`}
              ></CardPage>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

