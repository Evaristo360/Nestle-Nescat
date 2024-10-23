import React, { useEffect, useState } from 'react';
import { ScenePreview } from 'views/Scenes/ScenePreview';
import { useHistory } from 'react-router-dom';
import useAxios from 'hooks/useAxios';
import _ from 'lodash-es';

const orderItems = (items) => {
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

  return items;
};

export const CampaignPreview = (props) => {
  const campaignId = props.match.params.id;
  const history = useHistory();
  const onClose = () => history.push('/campaigns/list');
  const [preview, setPreview] = useState(false);
  const [campaign, setCampaign] = useState({});
  const [index, setIndex] = useState(0);
  const [scenes, setScenes] = useState({});
  const { get } = useAxios();
  const [closeFullScreen, setCloseFullScreen] = useState(false);
  const [finalScene, setFinalScene] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let response = await get(`/campaign/${campaignId}/details`);
        let campaign = _.get(response, 'data.result.items[0]', {
          scene_ids: []
        });

        console.log({ campaign })
        setCampaign({ name: campaign.name });
        let scenes = _.get(campaign, 'scene', []).map((scene) => {
          scene.resolution = { width: scene.width, height: scene.height };
          scene.advertisement = orderItems(scene.advertisement);

          return scene;
        });

        setScenes(scenes);
        setPreview(true);
        if (scenes.length == 1) {
          setFinalScene(true);
        }
      } catch (error) {
        console.info('[Scenes error]', error);
      }
    })();
  }, []);

  const onFinishDisplayScene = () => {
    setCloseFullScreen(true);
    if (index + 1 < scenes.length) {
      setIndex(index + 1);
    }

    setFinalScene(true);
  };

  const getScene = () => {
    if (scenes[index]) {
      return {
        ...scenes[index],
        name: campaign.name
      };
    }

    return {};
  };

  const getTimeline = () => {
    let timeline = _.get(scenes, `[${index}].advertisement`, []);

    return timeline;
  };

  const getResolution = () => {
    let resolution = _.get(scenes, `[${index}].resolution`, {
      width: 500,
      height: 700
    });

    return resolution;
  };

  console.log(getScene(), getTimeline(), getResolution())

  return (
    <ScenePreview
      scene={getScene()}
      timeline={getTimeline()}
      resolution={getResolution()}
      show={preview}
      onClose={onClose}
      onFinishDisplay={onFinishDisplayScene}
      closeFullScreen={closeFullScreen}
      setCloseFullScreen={setCloseFullScreen}
      finalScene={finalScene}
    />
  );
};
