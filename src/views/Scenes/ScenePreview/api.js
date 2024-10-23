import { config } from 'providers/config';

const api = config.siteConfig.apiUrl;

export const createMediaUrl = (id, extension, type) =>
  `${api}/advertisement_file/${type}/${id}.${extension}`;
