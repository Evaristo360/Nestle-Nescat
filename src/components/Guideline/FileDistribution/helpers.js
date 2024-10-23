import { Images } from 'assets';

const getIconByExtension = (fileExtension) => {
  let icon = null;

  switch (fileExtension) {
    case '' || undefined:
      icon = Images.folderIcon;
      break;

    case 'js':
      icon = Images.jsIcon;
      break;

    case 'jsx':
      icon = Images.reactIcon;
      break;

    case 'scss':
      icon = Images.scssIcon;
      break;

    case 'svg':
      icon = Images.svgIcon;
      break;

    case 'png':
      icon = Images.imageIcon;
      break;

    case 'jpg':
      icon = Images.imageIcon;
      break;

    case 'json':
      icon = Images.bracketsIcon;
      break;

    default:
      break;
  }

  return icon;
};

export { getIconByExtension };
