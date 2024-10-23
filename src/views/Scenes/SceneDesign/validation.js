export const supportedTypes = {
  video: ['.mp4', '.avi'],
  image: ['.jpg', '.jpeg', '.png', '.gif']
};

export const supportedSizes = {
  video: 100,
  image: 30
};

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const isSupportedType = (type, supportedTypes) => {
  type = `.${type.split('/')[1]}`;
  for (let t of supportedTypes) {
    if (t == type) return true;
  }

  return false;
};

export const isSupportedSize = (sizeBytes, maxSizeMB) =>
  sizeBytes / 1024 / 1024 < maxSizeMB;
