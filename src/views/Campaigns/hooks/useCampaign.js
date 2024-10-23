import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

const useCampaign = () => {
  const [scenes, scenesUpdate] = useState([]);
  const [canUpdate, canUpdateUpdate] = useState(false);
  const [campaignName, campaignNameUpdate] = useState('');
  const [loading, loadingUpdate] = useState(false);
  const [id, idUpdate] = useState(useParams().id);
  const [alertVisible, updateAlertVisible] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    if (id) {
      GetByIdCampaign(id);
    }
  }, [id]);

  useEffect(() => {
    canUpdateUpdate(
      campaignName.length > 1 && campaignName.length <= 50 && scenes.length > 0
    );
  }, [scenes, campaignName]);

  const removeScene = (scene) => {
    let newArray = [...scenes];

    newArray.splice(
      scenes.findIndex((s) => s.id === scene.id),
      1
    );
    scenesUpdate(newArray);
  };

  const changeScenes = ({ newItems }) => {
    scenesUpdate(newItems);
  };

  const addScene = (scene) => {
    if (scenes.includes(scene) === false) {
      scenesUpdate([...scenes, scene]);
    }
  };

  const actionCampaign = () => {
    const action = id ? UpdateCampaign : AddCampaign;

    action();
  };
  const AddCampaign = () => {
    loadingUpdate(true);
    const campaign = {
      name: campaignName,
      scene_ids: scenes.map((s) => s.id)
    };

    axios
      .post('/campaign', campaign)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          updateAlertVisible(true);
          // history.push("/campaigns/list");
        }
      })
      .finally(() => {
        loadingUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const UpdateCampaign = () => {
    loadingUpdate(true);
    const campaign = {
      name: campaignName,
      scene_ids: scenes.map((s) => s.id)
    };

    axios
      .patch(`/campaign/${id}`, campaign)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          updateAlertVisible(true);
          //history.push("/campaigns/list");
        }
      })
      .finally(() => {
        loadingUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const GetByIdCampaign = (id) => {
    // loadingUpdate(true);
    axios
      .get(`/campaign/${id}/details`)
      .then((response) => {
        const campaign = _.get(response, 'data.result.items[0]', {});

        scenesUpdate(campaign.scene || []);
        campaignNameUpdate(campaign.name || '');
      })
      .finally(() => {
        loadingUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return [
    campaignName,
    canUpdate,
    scenes,
    removeScene,
    changeScenes,
    addScene,
    campaignNameUpdate,
    actionCampaign,
    loading,
    alertVisible,
    updateAlertVisible,
    id
  ];
};

export default useCampaign;
