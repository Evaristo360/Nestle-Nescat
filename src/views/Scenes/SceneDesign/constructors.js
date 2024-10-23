export const createMediaResource = (
  id,
  media_type,
  name,
  source,
  otherProps = {}
) => ({ media_type, name, id, source, ...otherProps });

export const createText = (data) =>
  createMediaResource(data.id, 'text', data.name, '', {
    set_duration: data.set_duration,
    duration: data.duration || 10,
    effect: data.effect || '',
    speed: data.speed || 2,
    colour_background: data.colour_background || '#000000',
    clock: data.clock || '',
    date: data.date || '',
    format_date: data.format_date,
    edit_window: data.edit_window || ''
  });

export const createWeb = (data) =>
  createMediaResource(data.id, 'web', data.name, '', {
    set_duration: data.set_duration,
    duration: data.duration || 10,
    url: data.url,
    scale_percentage: data.scale_percentage,
    clear_background: data.clear_background,
    //advertisement_id: data.id
  });

export const createVideo = (data) =>
  createMediaResource(data.id, 'video', data.name, data.source, {
    advertisement_id: data.advertisement_id,
    set_duration: data.set_duration,
    duration: data.duration || 10,
    silence: data.silence || false,
    extension: data.extension
  });

export const createImage = (data) =>
  createMediaResource(data.id, 'image', data.name, data.source, {
    advertisement_id: data.advertisement_id,
    duration: data.duration || 10,
    set_duration: data.set_duration,
    extension: data.extension,
    resolution: '100x100'
  });

export const createTimelineImageFromCarousel = (data, scene_id) => ({
  fileInfo: {
    advertisement_id: data.id,
    extension: data.extension
  },
  item: {
    scene_id,
    advertisement_id: data.id,
    set_duration: false,
    name: data.name,
    resolution: '100x100'
  }
});

export const createTimelineVideoFromCarousel = (data, scene_id) => ({
  fileInfo: {
    advertisement_id: data.id,
    extension: data.extension
  },
  item: {
    scene_id,
    advertisement_id: data.id,
    name: data.name,
    set_duration: false,
    silence: false
  }
});
