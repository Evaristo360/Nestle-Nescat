import AddMediaModal from '../AddMediaModal';
import _ from 'lodash-es';
import { addImageMessages } from '../SceneDesignMessages';
import { supportedTypes, supportedSizes } from '../validation';
import useAxios, { doGet, doPost, doDelete } from 'hooks/useAxios';
import { config } from 'providers/config';

const api = config.siteConfig.apiUrl;

const uploadImage = ({ scene_id, file, blob, filename }) =>
  new Promise((resolve, reject) => {
    let data = new FormData();

    data.append('name', filename);
    data.append('ad_file', file);

    let extraPropsForFront = {
      media_type: 'image',
      source: URL.createObjectURL(blob)
    };
    let img = new Image();

    img.src = URL.createObjectURL(blob);
    img.onload = () => {
      doPost('/advertisements/image', data)
        .then(({ result }) => {
          let resultUploadImage = result.items[0];
          // let resultUploadImage = result;
          

          if (result.error) {
            resolve({ ...extraPropsForFront, ...result });
          } else {
            let assignedMediaData = {
              scene_id,
              advertisement_id: resultUploadImage.id,
              name: resultUploadImage.name,
              set_duration: false,
              resolution: `${img.width}x${img.height}`
            };

            doPost('/advertisements/image/design', assignedMediaData)
              .then(({ result }) => {
                resolve({
                  ...resultUploadImage,
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
    };
  });

const useSearchFunc = () => {
  const { get } = useAxios();
  const searchFunc = async (params) => {
    params.type = 'image';
    let response = await get('/advertisements', { params });
    let items = _.get(response, 'data.result.items', []);

    let promises = [];

    items.forEach((it) => {
      promises.push(
        new Promise((resolve) => {
          let img = new Image();

          img.onload = () => {
            resolve(`${img.width}x${img.height}`);
          };

          img.onerror = () => resolve('');
          img.src = `${api}/advertisement_file/image/${it.id}.${it.extension}`;
        })
      );
    });
    let resolutions = await Promise.all(promises);

    for (let i = 0; i < items.length; i++) {
      items[i].resolution = resolutions[i];
      items[
        i
      ].source = `${api}/advertisement_file/image/${items[i].id}.${items[i].extension}`;
    }

    return {
      mediaResources: items,
      totalFound: _.get(response, 'data.result.totalFound', 0)
    };
  };

  return searchFunc;
};

const addAssignedMediaFunc = (mediaResource, scene_id, timeline_length) =>
  new Promise((resolve, reject) => {
    let assignedMedia = {
      scene_id,
      advertisement_id: mediaResource.id,
      name: mediaResource.name,
      set_duration: false,
      resolution: mediaResource.resolution
    };

    doPost('/advertisements/image/design', assignedMedia)
      .then(({ result }) => {
        let item = _.get(result, 'items[0]', {});

        item.order_ad = timeline_length + 1;
        resolve(item);
      })
      .catch((error) => {
        reject(error);
      });
  });

const deleteAssignedMediaFunc = (id) =>
  doDelete(`/advertisements/image/design/${id}`);
const deleteResourceFunc = (id) => doDelete(`/advertisements/design/${id}`);

const AddImageModal = ({
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
      messages={addImageMessages}
      media_type="image"
      timeline_length={timeline_length}
      initAssignedMedia={initAssignedMedia}
      initMediaResources={initMediaResources}
      supportedTypes={supportedTypes.image}
      maxSizeMB={supportedSizes.image}
      uploadFileFunc={uploadImage}
      deleteResourceFunc={deleteResourceFunc}
      addAssignedMediaFunc={addAssignedMediaFunc}
      deleteAssignedMediaFunc={deleteAssignedMediaFunc}
      searchFunc={searchFunc}
      scene_id={scene_id}
    />
  );
};

export default AddImageModal;
