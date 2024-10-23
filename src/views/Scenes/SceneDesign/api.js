import _ from 'lodash-es';
import {
  createMediaResource,
  createImage,
  createVideo,
  createWeb,
  createText
} from './constructors';
import useAxios, { doPost, doPut, doDelete, doPatch } from 'hooks/useAxios';
import { config } from 'providers/config';

const api = config.siteConfig.apiUrl;

export const useSceneDesignApi = () => {
  const { get, put, post } = useAxios();

  const updateTimelineOrderById = (id, type, order) => {
    let route = `/advertisements/${type}/design/${id}`;

    if (type === 'text' || type === 'web') {
      route = `/advertisements/${type}/${id}`;
    }

    return doPatch(route, { order_ad: parseInt(order) });
  };

  const getSceneDesignById = async (id) => {
    let response = await get(`/advertisements/design/${id}`);
    let items = _.get(response, 'data.result.items', []);

    items = items.map((it, index) => {
      if (it.type === 'imagen') {
        it.type = 'image';
      }

      if (typeof it.order_ad !== 'number') {
        it.order_ad = index;
      }

      it.media_type = it.type;

      return it;
    });
    for (let i = 0; i < items.length; i++) {
      let min = i;

      for (let j = i + 1; j < items.length; j++) {
        if (items[min].order_ad > items[j].order_ad) {
          min = j;
        }
      }

      if (min !== i) {
        let aux = items[i];

        items[i] = items[min];
        items[min] = aux;
      }
    }

    return { timeline: items };
  };

  const getMultimedia = () =>
    new Promise(async (resolve) => {
      const types = ['video', 'image'];
      let multimedia = [];

      for (let type of types) {
        let response = await get(`/advertisements?type=${type}`);
        let items = _.get(response, 'data.result.items', []);

        items.forEach((m) => {
          multimedia.push(
            createMediaResource(
              m.id,
              m.type,
              m.name,
              `${api}/advertisement_file/${type}/${m.id}.${m.extension}`,
              { ...m }
            )
          );
        });
      }

      resolve({ multimedia });
    });

  const getScenes = async () => {
    let response = await get('/scene');
    let scenes = _.get(response, 'data.items', []);

    for (let scene of scenes) {
      let resolution = await getResolutionById(scene.resolution_id);

      scene.resolution = resolution;
    }

    return { scenes };
  };

  const getResolutionById = async (id) => {
    let response = await get(`/resolution/${id}`);
    let result = _.get(response, 'data.result.items[0]', {});

    return result;
  };

  const updateTimelineVideoById = (id, data) =>
    doPatch(`/advertisements/video/design/${id}`, data);

  const createTimelineVideo = (data) =>
    doPost(`/advertisements/video/design`, data);

  const createTimelineImage = (data) =>
    doPost(`/advertisements/image/design`, data);

  const deleteTimelineItemById = (id, type) => {
    let route = `/advertisements/${type}/design/${id}`;

    switch (type) {
      case 'text':
        route = `/advertisements/text/${id}`;
        break;
      case 'web':
        route = `/advertisements/web/${id}`;
        break;
      default:
    }

    return doDelete(route);
  };

  const createTimelineItem = (type, data, scene_id) => {
    let requestData = {};
    let route = `/advertisements/${type}/design`;

    switch (type) {
      case 'video':
        requestData = createVideo(data);
        break;
      case 'image':
        requestData = createImage(data);
        break;
      case 'text':
        requestData = createText(data);
        route = `/advertisements/${type}`;
        delete requestData.clock;
        delete requestData.date;
        if (requestData.effect === 'Ninguno') {
          delete requestData.speed;
          delete requestData.colour_background;
        }

        break;
      case 'web':
        requestData = createWeb(data);
        route = `/advertisements/${type}`;
        break;
      default:
    }

    delete requestData.media_type;
    delete requestData.extension;
    delete requestData.id;
    delete requestData.source;

    requestData.set_duration = Boolean(requestData.set_duration);
    requestData.scene_id = scene_id;
    if (!requestData.set_duration) {
      delete requestData.duration;
    }

    return doPost(route, requestData);
  };

  const saveTimelineOrders = (items) =>
    new Promise((resolve, reject) => {
      let promises = [];

      for (let i = 0; i < items.length; i++) {
        promises.push(
          updateTimelineOrderById(
            items[i].id,
            items[i].media_type || items[i].type,
            i+1
          )
        );
      }

      Promise.all(promises)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => reject(error));
    });

  return {
    getSceneDesignById,
    getMultimedia,
    getScenes,
    getResolutionById,
    updateTimelineVideoById,
    createTimelineVideo,
    createTimelineImage,
    deleteTimelineItemById,
    createTimelineItem,
    updateTimelineOrderById,
    saveTimelineOrders
  };
};
