import React from 'react';
import { css } from '@emotion/react';

const InfoModal = (props) => {
  const infoModalStyle = css`
    .dashed {
      list-style: none;
      padding: 8px;
    }
    .dashed > li {
      text-indent: -5px;
    }
    .dashed > li:before {
      content: '-';
      text-indent: -5px;
    }
  `;

  const { roleId } = props;
  return (
    <div css={infoModalStyle}>
      {roleId === 1 || roleId === 2 || roleId === 3 ? nestleInfo : clientInfo}
    </div>
  );
};

export default InfoModal;

const nestleInfo = (
  <>
    <p>Para crear una promoción los siguientes campos son obligatorios:</p>
    <ul className="dashed">
      <li>Imagen</li>
      <li>Vigencia</li>
      <li>Título tipo de promoción</li>
      <li>Cliente</li>
      <li>Sucursal</li>
    </ul>
    <p>
      En caso de seleccionar una promoción tipo “usuario” debe llenar la
      siguiente información: *
    </p>
    <ul className="dashed">
      <li>Al menos una clasificación de usuario</li>
      <li>Si se selecciona puntos del usuario sus campos son obligatorios</li>
      <li>
        Si se selecciona productos comprados por usuario sus campos son
        obligatorios y al menos debe tener un producto
      </li>
      <li>Si se selecciona Código el campo es obligatorio</li>
      <li>Cantidad de veces que aplica la promoción</li>
    </ul>
  </>
);

const clientInfo = (
  <>
    <p>Para crear una promoción los siguientes campos son obligatorios:</p>
    <ul className="dashed">
      <li>Imagen</li>
      <li>Vigencia</li>
      <li>Título</li>
      <li>Sucursal</li>
    </ul>
  </>
);
