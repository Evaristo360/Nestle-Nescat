import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  ProductAccordionTitle: {
    id: 'views.productForm.ProductAccordionTitle',
    defaultMessage: 'Producto'
  },
  dataDivision: {
    id: 'views.productForm.dataDivision',
    defaultMessage: 'División'
  },
  dataCategory: {
    id: 'views.productForm.dataCategory',
    defaultMessage: 'Categoría'
  },
  dataMaterialGroup: {
    id: 'views.productForm.dataMaterialGroup',
    defaultMessage: 'Material group'
  },
  dataProductName: {
    id: 'views.productForm.dataProductName',
    defaultMessage: 'Nombre del producto a mostrar'
  },
  dataUnitType: {
    id: 'views.productForm.dataUnitType',
    defaultMessage: 'Tipo de unidad'
  },
  dataUnitPrice: {
    id: 'views.productForm.dataUnitPrice',
    defaultMessage: 'Precio por unidad'
  },
  dataQuantity: {
    id: 'views.productForm.dataQuantity',
    defaultMessage: 'Cantidad'
  },
  dataTotalPrice: {
    id: 'views.productForm.dataTotalPrice',
    defaultMessage: 'Precio total'
  },
  //<<<<<<<<<<<<<<<<<<<VALIDATIONS>>>>>>>>>>>>>>>>>>>>
  required: {
    id: 'views.productForm.required',
    defaultMessage: 'Este campo es requerido'
  },
  onlyLetters: {
    id: 'views.productForm.onlyLetters',
    defaultMessage: 'Este campo solo puede contener letras'
  },
  invalidEmail: {
    id: 'views.productForm.invalidEmail',
    defaultMessage: 'Correo electrónico inválido'
  },
  onlyNumbers: {
    id: 'views.productForm.onlyNumbers',
    defaultMessage: 'Este campo solo puede contener números'
  },
  maxSizeImage: {
    id: 'views.productForm.maxSizeImage',
    defaultMessage: 'Máx. 5MB'
  },
  invalidTypeImage: {
    id: 'views.productForm.invalidTypeImage',
    defaultMessage: 'Tipo de archivo inválido. Tipos soportados: jpg, gif, png, jpeg'
  },
  });
