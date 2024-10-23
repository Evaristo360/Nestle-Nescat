import _ from 'lodash-es';
import AddMediaModal from '../AddMediaModal';
import { addVideoMessages } from '../SceneDesignMessages';
import { supportedTypes, supportedSizes } from '../validation';
import useAxios, { doPost, doDelete } from 'hooks/useAxios';
import { createMediaUrl } from '../../ScenePreview/api';

const getVideoDuration = (src) =>
  new Promise((resolve, reject) => {
    let videoEl = document.createElement('video');

    videoEl.onloadedmetadata = () => {
      resolve(videoEl.duration);
    };

    videoEl.onerror = () => reject(`Cannot load this video: ${src}`);
    videoEl.src = src;
  });

const uploadVideo = ({ file, blob, filename, duration, scene_id }) =>
  new Promise((resolve, reject) => {
    let extraPropsForFront = {
      source: URL.createObjectURL(blob),
      media_type: 'video'
    };
    let data = new FormData();

    data.append('name', filename);
    data.append('ad_file', file);
    doPost(`/advertisements/video`, data)
      .then(({ result }) => {
        let resultUploadVideo = result.items[0];

        if (result.error) {
          resolve({ ...extraPropsForFront, ...result });
        } else {
          let assignedMedia = {
            scene_id,
            advertisement_id: resultUploadVideo.id,
            name: resultUploadVideo.name,
            set_duration: true,
            duration: Math.round(parseInt(duration)) || 10,
            silence: false
          };

          doPost('/advertisements/video/design', assignedMedia)
            .then(({ result }) => {
              resolve({
                ...resultUploadVideo,
                ...result.items[0],
                id: result.items[0].id,
                ...extraPropsForFront
              });
            })
            .catch((error) => {
              reject(error);
            });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

const useSearchFunc = () => {
  const { get } = useAxios();
  const searchFunc = async (params) => {
    params.type = 'video';
    let response = await get('/advertisements', { params });

    return {
      mediaResources: _.get(response, 'data.result.items', []),
      totalFound: _.get(response, 'data.result.totalFound', 0)
    };
  };

  return searchFunc;
};

const addAssignedMediaFunc = (mediaResource, scene_id, timeline_length) =>
  new Promise((resolve, reject) => {
    let url = createMediaUrl(
      mediaResource.id,
      mediaResource.extension,
      'video'
    );

    getVideoDuration(url)
      .then((duration) => {
        let assignedMedia = {
          scene_id,
          advertisement_id: mediaResource.id,
          name: mediaResource.name,
          set_duration: true,
          duration: parseInt(Math.round(duration)),
          silence: false
        };

        doPost('/advertisements/video/design', assignedMedia)
          .then(({ result }) => {
            let item = _.get(result, 'items[0]', {});

            item.order_ad = timeline_length + 1;
            resolve(item);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => reject('Cannot get video duration: ', url));
  });

const deleteAssignedMediaFunc = (id) =>
  doDelete(`/advertisements/video/design/${id}`);
const deleteResourceFunc = (id) => doDelete(`/advertisements/design/${id}`);

const AddVideoModal = ({
  onAccept,
  onClose,
  initAssignedMedia = [],
  initMediaResources = [],
  scene_id,
  timeline_length
}) => {
  const searchFunc = useSearchFunc();

  return (
    <AddMediaModal
      onAccept={onAccept}
      onClose={onClose}
      messages={addVideoMessages}
      media_type="video"
      timeline_length={timeline_length}
      initAssignedMedia={initAssignedMedia}
      initMediaResources={initMediaResources}
      supportedTypes={supportedTypes.video}
      maxSizeMB={supportedSizes.video}
      uploadFileFunc={uploadVideo}
      deleteResourceFunc={deleteResourceFunc}
      addAssignedMediaFunc={addAssignedMediaFunc}
      deleteAssignedMediaFunc={deleteAssignedMediaFunc}
      searchFunc={searchFunc}
      scene_id={scene_id}
    />
  );
};

export default AddVideoModal;
