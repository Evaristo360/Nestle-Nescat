import { actions } from './actions';
import { createOption } from 'components/Select';

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.setState:
      return {
        ...state,
        ...action.state
      };
    case actions.toggleMuteVideo:
      return {
        ...state,
        timeline: state.timeline.map((m, i) => {
          if (i === action.index) {
            m.silence = !m.silence;
          }

          return { ...m };
        })
      };
    case actions.addToTimeline:
      return {
        ...state,
        timeline: [...state.timeline, action.item]
      };
    case actions.deleteFromTimeline:
      return {
        ...state,
        timeline: state.timeline.filter((e, i) => i !== action.index)
      };
    case actions.concatToTimeline:
      return {
        ...state,
        timeline: state.timeline.concat(action.items)
      };
    case actions.updateTimelineItem:
      return {
        ...state,
        timeline: state.timeline.map((it) => {
          if (it.id === action.item.id) {
            it = { ...it, ...action.item };
          }

          return it;
        })
      };
    case actions.updateSceneDuration:
      let a = state.timeline.reduce((duration, item) => {

        duration += Number(item.duration);

        return duration;
      }, 0);

      return {
        ...state,
        sceneDuration: state.timeline.reduce((duration, item) => {
          duration += Number(item.duration);

          return duration;
        }, 0)
      };
    case actions.updateSceneSelect:
      return {
        ...state,
        sceneOptions: state.scenes.map((s) => createOption(s.id, s.name))
      };
    case actions.updateScene:
      let currentScene = state.scenes.find((s) => s.id == state.sceneId);

      return {
        ...state,
        timeline: action.timeline,
        sceneBackground: currentScene ? currentScene.color : '#000000'
      };
    case actions.updateSceneBackground:
      let s = state.scenes.find((s) => s.id == state.sceneId);

      return {
        ...state,
        sceneBackground: s ? s.color : '#000000'
      };
    case actions.updateResolution:
      let scene = state.scenes.find((s) => s.id == state.sceneId);

      return {
        ...state,
        resolution: scene ? scene.resolution : { width: 500, height: 650 }
      };
    case actions.updateSceneById:
      return {
        ...state,
        scenes: state.scenes.map((s) => {
          if (action.id === s.id) {
            s = { ...s, ...action.data };
          }

          return s;
        }),
        sceneBackground: action.data.color
      };
    case actions.deleteFromTimelineById:
      return {
        ...state,
        timeline: state.timeline.filter((t) => t.id !== action.id)
      };
    case actions.deleteTimelineItemsByAdvertisementIds:
      return {
        ...state,
        timeline: state.timeline.filter((item) => {
          for (let adId of action.ids) {
            if (adId == item.advertisement_id) {
              return false;
            }
          }

          return true;
        })
      };
    default:
      return state;
  }
};
