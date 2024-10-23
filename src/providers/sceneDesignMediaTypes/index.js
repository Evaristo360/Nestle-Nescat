import TextIcon from 'assets/icons/text.svg';
import PictureIcon from 'assets/icons/image.svg';
import VideoIcon from 'assets/icons/video.svg';
import WebIcon from 'assets/icons/web.svg';

const createMediaType = (label, name, Icon) => ({ label, name, Icon });

const media_types = [
  createMediaType('Video', 'video', VideoIcon),
  createMediaType('Imagen', 'image', PictureIcon),
  createMediaType('Página web', 'web', WebIcon),
  createMediaType('Texto', 'text', TextIcon)
];

export default media_types;
