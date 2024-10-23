import { defineMessages } from 'react-intl';

export const fileDistributionMessages = defineMessages({
  title: {
    id: 'components.Guideline.FileDistribution.title',
    defaultMessage: 'Archivos'
  },
  summary: {
    id: 'components.Guideline.FileDistribution.summary',
    defaultMessage: `En esta sección encontrarás una breve guía sobre la distribución de archivos de la arquitectura. 
    {br} Puedes interactuar con la mayoría de elementos del explorador de archivos que se muestra más abajo,
    en algunos archivos además de una explicación podrás encontrar algo de código como referencia.`
  },
  sourceCodeLabel: {
    id: 'components.Guideline.FileDistribution.sourceCodeLabel',
    defaultMessage: 'Código fuente'
  },
  mappers: {
    id: 'components.Guideline.FileDistribution.mappers',
    defaultMessage:
      'Los mappers sirven para transformar la respuesta de un API en una estructura de datos específica basada en un template acorde a nuestros mocks. {br} La ventaja principal de utilizar mappers es que los cambios en las APIs no afecten directamente nuestro desarrollo.'
  },
  context: {
    id: 'components.Guideline.FileDistribution.context',
    defaultMessage:
      'Los archivos jsx con el sufijo "Context" únicamente contienen la declaración de un Contexto de React, mismo que será alimentado por un Provider e irá mutando su valor desde cualquier parte de la aplicación.'
  },
  provider: {
    id: 'components.Guideline.FileDistribution.provider',
    defaultMessage:
      'Los archivos jsx con el sufijo "Provider" contienen el Proveedor de contexto principal y son utilizados para compartir el valor de un Contexto con diversos módulos de la aplicación. {br} Como regla principal estos wrappers reciben un "children" en sus props y son importados y utilizados en el Root.jsx de la Aplicación.'
  },
  messages: {
    id: 'components.Guideline.FileDistribution.messages',
    defaultMessage:
      'Los archivos con el sufijo "Messages" tienen como objetivo principal definir los textos del componente que serán traducidos usando react-intl. La ventaja de tenerlos en estos ficheros nos ayuda a poder generar traducciones en múltiples idiomas de forma automática.'
  },
  src: {
    id: 'components.Guideline.FileDistribution.src',
    defaultMessage: 'Esta carpeta contiene el código fuente de la aplicación.'
  },
  assets: {
    id: 'components.Guideline.FileDistribution.assets',
    defaultMessage:
      'En esta carpeta se incluyen archivos estáticos que no interfieren directamente con el funcionamiento de la aplicación, por ejemplo: Imágenes, Iconos, Fuentes, etc. {br}{br} Es obligatorio que importemos estos recursos utilizando un archivo .js principal, para mayor detalle puedes revisar el archivo Images.js.'
  },
  components: {
    id: 'components.Guideline.FileDistribution.components',
    defaultMessage:
      'El contenido de esta carpeta es exclusivo para la creación de los Componentes de la aplicación, los archivos de un componente deben crearse en una carpeta que tenga el mismo nombre del componente, y a su vez todos los ficheros que formen parte de la lógica del mismo deberán tener como prefijo el nombre del componente, esto facilitará su localización a la hora de buscarlo en el VSCode.'
  },
  hooks: {
    id: 'components.Guideline.FileDistribution.hooks',
    defaultMessage:
      'Esta carpeta contiene hooks que pueden ser utilizados por cualquier componente de nuestra aplicación. Con hooks, puedes extraer lógica de estado de un componente de tal forma que este pueda ser probado y re-usado independientemente. {br}{br} Los Hooks te permiten reutilizar lógica de estado sin cambiar la jerarquía de tu componente. A menudo tenemos que mantener componentes que empiezan simples pero con el pasar del tiempo crecen y se convierten en un lío inmanejable de múltiples lógicas de estado y efectos secundarios.'
  },
  layouts: {
    id: 'components.Guideline.FileDistribution.layouts',
    defaultMessage:
      'Los layouts son estructuras genéricas para distribuir las vistas de la aplicación, por ejemplo BaseLayout tiene un header y el contenido es renderizado debajo del mismo, por otra parte FullScreenLayout no tiene un header, con esto logramos reutilizar las estructuras principales de nuestra Aplicación sin necesidad de duplicar código en todas las views.'
  },
  translations: {
    id: 'components.Guideline.FileDistribution.translations',
    defaultMessage:
      'Contiene archivos json con las traducciones de todos los textos utilizados en la aplicación e interpretados por react-intl. Por default se tiene el soporte para los idiomas "en" y "es-mx", pero se puede agregar cualquier idioma que se requiera. {br}{br} Es obligatorio que cualquier texto sea renderizado en los componentes usando react-intl, y el idioma principal es "es-mx".'
  },
  scss: {
    id: 'components.Guideline.FileDistribution.scss',
    defaultMessage:
      'Los archivos SASS pueden ser utilizados para crear hojas de estilo personalizadas, únicamente esta permitido utilizar SASS cuando los estilos requeridos por UX sean muy específicos y no podamos crearlos usando Material UI, siempre debemos considerar dejarlos como última opción debido a que utilizamos Material UI para manejar los Temas y estilos de la aplicación.'
  },
  jsx: {
    id: 'components.Guideline.FileDistribution.jsx',
    defaultMessage:
      'Debemos utilizar la extensión jsx para nombrar todos los archivos en donde utilicemos React, esto con el objetivo de diferenciar los Componentes de un .js tradicional.'
  },
  providers: {
    id: 'components.Guideline.FileDistribution.providers',
    defaultMessage:
      'En esta carpeta se encuentran aquellos recursos que van a ser utilizados por la aplicación en general, la idea es centralizarlos para tener apertura en caso de que en algún momento podamos hacer switch para extraerlos desde otra fuente. {br}{br} Por ahora, tenemos soporte para la configuración general, temas y recursos de API.'
  },
  config: {
    id: 'components.Guideline.FileDistribution.config',
    defaultMessage:
      'En nuestras aplicaciones utilizamos configuración por medio de archivos .env las cuales son cargadas y compiladas en tiempo de ejecución. {br}{br} Es 100% necesario que todas las configuraciones sean procesadas en el config/provider.js, con esto lograremos que en determinado momento podamos obtener configuraciones de diversas fuentes (por ejemplo un API) para aplicar cambios en caliente sin necesidad de tener que hacer un deploy.'
  },
  theme: {
    id: 'components.Guideline.FileDistribution.theme',
    defaultMessage:
      'Contiene la configuración global del tema de Material UI, en este provider se pueden configurar las paletas de colores, tamaño de fuentes, breakpoints, entre otros puntos. Actualmente la aplicación tiene soporte para las variantes de tema DARK y LIGHT.'
  },
  api: {
    id: 'components.Guideline.FileDistribution.api',
    defaultMessage:
      'Contiene las definiciones para los servicios de backend, en la carpeta "request" se deben incluir las definiciones de los endpoints con sus verbos HTTP, y en la carpeta "mappers" se debe incluir un objeto que sirva para transformar el response acorde a nuestros mocks. {br}{br} Si en algún momento ocurre un cambio en la estructura del response por parte de Backend este será el único fichero que tendremos que modificar para que nuestro componente siga funcionando sin mayor problema.'
  },
  js: {
    id: 'components.Guideline.FileDistribution.js',
    defaultMessage:
      'Los archivos index.js tienen como objetivo principal exportar todos los elementos que pueden ser accesibles desde otros directorios, con esto evitamos imports que apunten a cada archivo y logramos un código más limpio y accesible usando únicamente el nombre de la carpeta.'
  },
  styles: {
    id: 'components.Guideline.FileDistribution.styles',
    defaultMessage:
      'Los archivos con sufijo "Styles" sirven para declarar un objeto para estilizar nuestros componentes utilizando Material UI. Estos archivos deben exportar una única función llamada "useStyles".'
  }
});
