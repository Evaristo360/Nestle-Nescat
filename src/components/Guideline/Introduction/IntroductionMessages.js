import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: `components.Guideline.Introduction.title`,
    defaultMessage: 'Hooks'
  },
  aboutHooks: {
    id: `components.Guideline.Introduction.aboutHooks`,
    defaultMessage:
      'Los Hooks son una nueva incorporación en React 16.8. Te permiten usar estado y otras características de React sin escribir una clase.'
  },
  motivationSubtitle: {
    id: `components.Guideline.Introduction.subtitleMotivation`,
    defaultMessage: 'Motivación'
  },
  motivationContent: {
    id: `components.Guideline.Introduction.motivationContent`,
    defaultMessage:
      'Los Hooks resuelven una amplia variedad de problemas aparentemente desconectados en React que hemos encontrado durante más de cinco años de escribir y mantener decenas de miles de componentes. Ya sea que estés aprendiendo React, usándolo diariamente o incluso prefieras una librería diferente con un modelo de componentes similar, es posible que reconozcas algunos de estos problemas. {br}{br} Con Hooks, puedes extraer lógica de estado de un componente de tal forma que este pueda ser probado y re-usado independientemente. Los Hooks te permiten reutilizar lógica de estado sin cambiar la jerarquía de tu componente. Esto facilita el compartir Hooks entre muchos componentes o incluso con la comunidad.'
  },
  buttonExampleNotFound: {
    id: `components.Guideline.Introduction.buttonExampleNotFound`,
    defaultMessage: 'Navegar a una ruta no válida'
  },
  buttonFilesDistribution: {
    id: `components.Guideline.Introduction.buttonFilesDistribution`,
    defaultMessage: 'Distribución de archivos'
  },
  buttonExamples: {
    id: `components.Guideline.Introduction.buttonExamples`,
    defaultMessage: 'Códigos de ejemplo'
  },
  buttonOpenModal: {
    id: `components.Guideline.Introduction.buttonOpenModal`,
    defaultMessage: 'Abrir modal'
  }
});
